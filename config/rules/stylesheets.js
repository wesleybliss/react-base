const paths = require('../paths')

module.exports = [
    {
        test: /\.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,
                },
            },
            'postcss-loader',
        ],
        include: [
            paths.src,
            /node_modules/
        ],
    },
]
