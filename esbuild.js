const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const { spawn } = require('child_process')
const { createServer, request } = require('http')
const esbuild = require('esbuild')
const handler = require('serve-handler')

const postcss = require('postcss')
const cssnano = require('cssnano')
const options = require('./config/options')

const args = process.argv.slice(2)

if (fs.existsSync(options.shared.outdir))
    fs.rmSync(options.shared.outdir, { recursive: true })

const config = args[0] || 'build'
const static = path.resolve(__dirname, 'public')
const clients = [] // Dev server
// console.log('Build config', { config, options })

const applyTemplateVars = (file, fields = {}) => {
    let data = fs.readFileSync(file, 'utf8')
    console.log(`Applying template vars in ${path.basename(file)}...`)
    Object.keys(fields).forEach(it => {
        console.log(`    "${it}" -> "${fields[it]}"`)
        data = data.replace(`%${it}%`, fields[it])
    })
    fs.writeFileSync(file, data, 'utf8')
}

const minifyCss = async (source, target = null) => {
    
    const css = fs.readFileSync(source, 'utf8')
    
    const plugins = [
        cssnano({
            preset: ['default', {
                discardComments: {
                    removeAll: true,
                },
            }],
        }),
    ]
    
    const result = await postcss(plugins).process(css, {
        from: source,
        to: target || source,
    })
    
    fs.writeFileSync(target || source, result.css, 'utf8')
    
}

const copyStaticFiles = async () => {
    
    console.info('Copying static files...')
    
    try {
        await fse.copy(static, options.shared.outdir, { overwrite: false })
    } catch (e) {
        console.error('Failed to copy static files', e)
        return process.exit(1)
    }
    
}

const startDevServer = () => {
    
    const host = process.env.HOST || '0.0.0.0'
    // const port = parseInt(process.env.PORT || 3000, 10)
    // await serve(host/* , port */)
    
    esbuild.serve({ servedir: './' }, {}).then(result => {
        createServer((req, res) => {
            const { url, method, headers } = req
            if (req.url === '/esbuild') {
                return clients.push(
                    res.writeHead(200, {
                        'Content-Type': 'text/event-stream',
                        'Cache-Control': 'no-cache',
                        'Access-Control-Allow-Origin': '*',
                        Connection: 'keep-alive',
                    }),
                )
            }
            
            const path = url.split('/').pop().indexOf('.') ? url : `/index.html`
            const proxyOptions = {
                hostname: '0.0.0.0',
                port: 8000,
                path,
                method,
                headers,
            }
            const proxyReq = request(proxyOptions, prxRes => {
                res.writeHead(prxRes.statusCode, prxRes.headers)
                prxRes.pipe(res, { end: true })
            })
            req.pipe(proxyReq, { end: true })
            return null
        }).listen(5010)
        
        createServer((req, res) => {
            return handler(req, res, { public: options.shared.outdir })
        }).listen(process.env.PORT || 3000)
    })
    
}

const build = async () => {
    
    if (config === 'watch') {
        
        console.info('Creating development build...')
        options.development.watch = {
            onRebuild(error) {
                setTimeout(() => {
                    clients.forEach(res => res.write('data: update\n\n'))
                }, 1000)
                console.log(error || 'Client rebuilt')
            },
        }
        await esbuild.build(options.development)
        
    } else if (config === 'build') {
        
        console.info('Creating production build...')
        await esbuild.build(options.production)
        
        /* console.info('Copying static files...')
        try {
            await fse.copy(static, options.shared.outdir, { overwrite: false })
        } catch (e) {
            console.error('Failed to copy static files', e)
            return process.exit(1)
        } */
        
    }
    
    await copyStaticFiles()
    
    const index = {
        js: path.resolve(options.shared.outdir, 'index.js'),
        css: path.resolve(options.shared.outdir, 'index.css'),
        html: path.resolve(options.shared.outdir, 'index.html'),
    }
    
    const templateVars = Object.keys(options.env).reduce((acc, it) => ({
        ...acc,
        [it.split('.').pop()]: options.env[it],
    }), {})
    
    const bundle = {
        js: index.js.replace('index', `index-${Date.now()}`),
        css: index.css.replace('index', `index-${Date.now()}`),
    }
    
    //
    if (config !== 'build') {
        applyTemplateVars(index.html, {
            JS_BUNDLE: path.basename(index.js),
            CSS_BUNDLE: path.basename(index.css),
            ...templateVars,
        })
        return startDevServer()
    }
    
    console.info('Minifying CSS bundle...')
    await minifyCss(index.css)
    
    fs.renameSync(index.js, bundle.js)
    fs.renameSync(index.css, bundle.css)
    
    applyTemplateVars(index.html, {
        JS_BUNDLE: path.basename(bundle.js),
        CSS_BUNDLE: path.basename(bundle.css),
        ...templateVars,
    })
    
    
    
}

const serve = async (host, port) => {
    
    console.info(`Running dev server: http://${host}:${port}`)
    
    const servor = require('servor')
    const options = {
        // browser: true,
        root: target,
    }
    
    if (host) options.host = host
    if (port) options.port = port
    
    await servor(options)
    
}

build()
