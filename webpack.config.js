var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: path.resolve(__dirname, 'src/entrypoint.js'),
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
        extensions: ['.js']
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
