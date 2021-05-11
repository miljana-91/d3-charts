const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    plugins: [
        new HTMLWebpackPlugin({ filename: 'index.html', template: './src/index.html' })
    ],
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/i,
                use: ['file-loader, url-loader']
            },
            {
                test: /\.csv$/,
                loader: 'csv-loader',
                options: {
                  dynamicTyping: true,
                  header: true,
                  skipEmptyLines: true
                }
              }
        ]
    }
}