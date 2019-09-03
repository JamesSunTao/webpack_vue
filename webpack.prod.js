const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // css整合

const prodConfig = {
    mode:"production",
    // devtool: "cheap-module-source-map",
    module: {
        rules:[
          
            
        ]
    },
    optimization: {
        splitChunks: {
          chunks: 'all'
        }
    },
    plugins: [
        new OptimizeCSSAssetsPlugin({}),
    ],
}

module.exports = merge(commonConfig,prodConfig);