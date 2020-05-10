var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: path.resolve(__dirname, 'src/entrypoint.ts'),
    plugins: [
        new HtmlWebpackPlugin({
            templateParameters: {
                title: 'ChibiEngine',
            },
            template: path.resolve(__dirname, 'src/index.html'),
            inject: 'body',
        })
    ],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(frag|vert|glsl)$/,
                include: [
                    path.resolve(__dirname, 'src/chibi/glsl'),
                ],
                use: [
                    'raw-loader'
                ]
            },
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                use: [
                    'ts-loader'
                ]
            }
        ]
    },
    devServer: {
        contentBase: '/public/',
        inline: true,
        hot: true,
    },
    mode: debug ? 'development' : 'production',
    devtool: debug ? 'eval-source-map' : 'source-map',
};
