const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
            filename: "index.bundle.js",
                    path: __dirname + "/build"
    },
    plugins: [new HtmlWebpackPlugin({
        template: './index.html'
    })]
}

