const path = require('path');
const webpack = require('webpack');
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
        path: outputDirectoryPath,
        filename: '[name].js',
        chunkFilename: 'st'+'[name].js' // 代码拆分后的文件名
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
                  {
                    loader:  'css-loader',
                    options: {
                      importLoaders: 2 //在一个 css 中引入了另一个 css，也会执行之前两个 loader，即 postcss-loader 和 sass-loader
                    }
                  },
                  'postcss-loader',
                  'sass-loader'
                ],
            },
              // 图片资源规则
            {
                test: /\.(png|jpg|jpeg|gif|cur|ico)$/i,
                use:[
                    {
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
                     // img-loader for zip img
                    //  'image-webpack-loader'
                ]
               
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      name: '[name]-[hash:5].min.[ext]',
                      limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
                      publicPath: 'css/fonts/',
                      outputPath: 'css/fonts/'
                    }
                  }
                ]
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
        new HtmlWebpackPlugin({
            title:'HtmlWebpackPlugin 生成的tit',
            template: './template.html',
            minify: {
                // 压缩 HTML 文件
                removeComments: true, // 移除 HTML 中的注释
                // collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true // 压缩内联 css
              },
        
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? 'css/[name].css' : 'css/[name][hash:6].css',
            chunkFilename: devMode ? 'css/[id].css' : 'css/[id][hash:6].css',
        }),
        new webpack.ProvidePlugin({
            $: 'jquery', // npm
            jQuery: 'jquery' // 本地Js文件
        })
    ],
   
};