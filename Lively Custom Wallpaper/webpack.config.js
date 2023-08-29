const path = require('path');

const scriptsPath = path.join(__dirname, "src");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    watch: true,
    devtool: 'source-map',
    entry: {
        index: path.join(scriptsPath, "index.ts")
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: 'ts-loader',
            },
        ],
    },
};