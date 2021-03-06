const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    minimize: true,
    minimizer: [
        new TerserPlugin({
            extractComments: false,
        }),
    ],
    splitChunks: false,
}
