const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode:"development",
    devtool: "cheap-module-eval-source-map",
    devServer: {
        // contentBase:'./dist',
        open:true,
        port:5000,
        hot:true,  //热更新
        hotOnly:true,//热更新
    },
    module: {
        rules:[
          
            
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ],
}

module.exports = merge(commonConfig,prodConfig);