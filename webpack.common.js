const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会在打包结束后自动生成一个html，并把打包生成的js文件引入文件中
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


const entryDirectoryPath = path.resolve(__dirname, './src');
const outputDirectoryPath = path.resolve(__dirname, 'dist');
const devMode = process.argv.indexOf('-p') === -1;

console.log('devMode:'+devMode);
module.exports = {
    entry:{
        main:path.resolve(entryDirectoryPath,'main.js'),
    },
    output: {
        filename: '[name].js',
        path: outputDirectoryPath
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:[
                  'babel-loader',
                ] 
            }, 
            {
                test: /\.(sa|sc|c)ss$/,
                use: [               
                  devMode?'style-loader':MiniCssExtractPlugin.loader,   
                  'css-loader',
                  'postcss-loader',
                  'sass-loader',
                ],
            },
            {
                test: /\.(vue)$/,
                use:{
                    loader:'vue-loader',

                }
            }  
           ]
    },
  
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './template.html',
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ],
   
};