const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
const esbuild = require('esbuild')
const postcss = require('postcss')
const cssnano = require('cssnano')
const options = require('./config/options')

const args = process.argv.slice(2)

if (fs.existsSync(options.shared.outdir))
    fs.rmSync(options.shared.outdir, { recursive: true })

const config = args[0] || 'build'
const static = path.resolve(__dirname, 'public')
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

const build = async () => {
    
    if (config === 'watch') {
        
        console.info('Creating development build...')
        await esbuild.build(options.development)
        
        const host = process.env.HOST || '0.0.0.0'
        // const port = parseInt(process.env.PORT || 3000, 10)
        await serve(host/* , port */)
        
    } else if (config === 'build') {
        
        console.info('Creating production build...')
        await esbuild.build(options.production)
        
        console.info('Copying static files...')
        try {
            await fse.copy(static, options.shared.outdir, { overwrite: false })
        } catch (e) {
            console.error('Failed to copy static files', e)
            return process.exit(1)
        }
        
    }
    
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
