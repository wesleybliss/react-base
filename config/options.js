const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const esbuildResolvePlugin = require('./esbuild-resolve-plugin')
const esbuildAliasPlugin = require('./esbuild-alias-plugin')
const postCssPlugin = require('@deanc/esbuild-plugin-postcss')
const postcssImport = require('postcss-import')
const tailwindcssNesting = require('tailwindcss/nesting')
const tailwindcss = require('tailwindcss')
const postcssUrl = require('postcss-url')
const autoprefixer = require('autoprefixer')
const tailwindConfig = require('../tailwind.config')
const cssnano = require('cssnano')

const target = path.join(__dirname, '../build')

const loadEnvironment = () => {
    
    const env = path.resolve(__dirname, '../.env')
    const sampleEnv = path.resolve(__dirname, '../sample.env')
    
    if (process.env.IS_CI) {
        const { parsed } = dotenv.config({ path: sampleEnv })
        return Object.keys(parsed).reduce((acc, it) => ({
            ...acc,
            [it]: process.env[it],
        }), {})
    }
    
    if (!fs.existsSync(env))
        throw new Error('Could not find .env file')
    
    const { parsed } = dotenv.config({ path: env })
    
    // console.info('Loading env vars from system', parsed)
    
    return parsed
    
}

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    ...loadEnvironment(),
}

const define = Object.keys(env).reduce((acc, it) => ({
    ...acc,
    [`process.env.${it}`]: JSON.stringify(env[it]),
}), {})

const options = {
    env,
    shared: {
        entryPoints: ['src/index.js'],
        outdir: target,
        bundle: true,
        inject: ['./config/react-shim.js'],
        define,
        // resolveExtensions: ['.js'],
        plugins: [
            esbuildResolvePlugin(),
            esbuildAliasPlugin,
            postCssPlugin({
                plugins: [
                    postcssImport,
                    tailwindcssNesting,
                    tailwindcss(tailwindConfig),
                    postcssUrl,
                    autoprefixer,
                    cssnano({
                        preset: ['default', {
                            discardComments: {
                                removeAll: true,
                            },
                        }],
                    }),
                ],
            }),
        ],
        loader: {
            '.js': 'jsx',
            '.png': 'dataurl',
            '.svg': 'text',
            '.ttf': 'file',
            '.otf': 'file',
            '.svg': 'file',
            '.eot': 'file',
            '.woff': 'file',
            '.woff2': 'file',
        }
    },
}

options.development = {
    ...options.shared,
    sourcemap: true,
    minify: false,
    watch: true,
}

options.production = {
    ...options.shared,
    treeShaking: true,
    minify: true,
}

module.exports = options
