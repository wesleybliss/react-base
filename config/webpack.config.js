const path = require('path')
const paths = require('./paths')
const aliases = require('./aliases')
const rules = require('./rules')
const plugins = require('./plugins')
const optimization = require('./optimization')
const performance = require('./performance')

const prod = process.env.NODE_ENV === 'production'

const config = {
    mode: prod ? 'production' : 'development',
    entry: [path.resolve(paths.src, 'index.js')],
    output: {
        filename: '[name].[contenthash].bundle.js',
        path: paths.build,
        publicPath: '/',
    },
    target: 'web',
    resolve: {
        modules: [paths.src, 'node_modules'],
        alias: aliases,
        extensions: ['.js', '.jsx', '.json', '.css', '.svg'],
    },
    plugins,
    module: {
        rules,
    },
}

if (prod) {
    config.optimization = optimization
    config.performance = performance
} else {
    config.devtool = 'inline-source-map'
    config.devServer = {
        devMiddleware: {
            index: true,
            publicPath: '/',
        },
        static: paths.public,
        historyApiFallback: true,
        open: false,
        compress: true,
        hot: true,
        host: '0.0.0.0',
        port: process.env.PORT || 3001,
    }
}

module.exports = config
