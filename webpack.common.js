const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 会在打包结束后自动生成一个html，并把打包生成的js文件引入文件中
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css整合

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
              // 图片资源规则
            {
                test: /\.(png|jpg|jpeg|gif|cur|ico)$/i,
                loader: 'url-loader',
                options: {
                // 设置大小限制，超出后使用fiel-uploader
                limit: 8192,
                name (file) {
                    if (devMode) return '[path][name].[ext]';
                    return '[hash:6].[ext]';
                },
                outputPath: 'css/images/'
                }
            },
            {
                test: /\.(vue)$/,
                use:{
                    loader:'vue-loader',
                }
            }  
           ]
    },
    resolve: {
        // 后缀自动补全
        extensions: ['.js', '.vue'],       
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
        new OptimizeCSSAssetsPlugin({}),
        new HtmlWebpackPlugin({
            template: './template.html',
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name][hash:6].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id][hash:6].css',
        }),
    ],
   
};