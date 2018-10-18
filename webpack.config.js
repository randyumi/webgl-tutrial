const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    devtool: 'inline-source-map',
    mode: 'development',
    output: {
            filename: "index.bundle.js",
                    path: __dirname + "/build"
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'assets', to: 'assets'}
        ]),
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
}
