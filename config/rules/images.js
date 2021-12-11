
module.exports = [
    {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset/resource',
    },
    {
        test: /\.svg$/,
        oneOf: [
            {
                issuer: /\.s?css$/,
                type: 'asset/resource',
            },
            {
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgoConfig: {
                                plugins: [{ removeViewBox: false }],
                            },
                        },
                    },
                    {
                        loader: 'file-loader',
                    },
                ],
                type: 'javascript/auto',
            },
        ],
    },
]
