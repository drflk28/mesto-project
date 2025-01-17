const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: '../src/scripts/index.js', // Ваш основной JS файл
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'scripts/main.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/,
                use: ['file-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Путь к вашему HTML шаблону
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        hot: true,
    },
};
