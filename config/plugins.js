const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const DotenvPlugin = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const paths = require('./paths')

const src = path.resolve(__dirname, '../package.json')
const pkg = JSON.parse(fs.readFileSync(src, 'utf8'))

const loadEnvironment = () => {
    
    if (!process.env.SKIP_ENV_FILE) {
        console.info('Loading env vars from .env file')
        return new DotenvPlugin({
            path: path.resolve(__dirname, '../.env'),
        })
    }
    
    const { parsed } = dotenv.config({ path: path.resolve(__dirname, '../sample.env') })
    console.info('Loading env vars from system', Object.keys(parsed))
    return new webpack.EnvironmentPlugin(Object.keys(parsed))
    
}

const plugins = [
    loadEnvironment(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        title: pkg.name,
        favicon: path.resolve(paths.public, 'favicon.ico'),
        template: path.resolve(paths.public, 'index.html'),
        filename: 'index.html',
        templateParameters: {
            testExample: 'content',
        },
    }),
    new InterpolateHtmlPlugin({
        NODE_ENV: process.env.NODE_ENV,
        PUBLIC_URL: '/',
        TITLE: pkg.name,
    }),
    new webpack.ProvidePlugin({
        React: 'react',
    }),
]

module.exports = plugins
