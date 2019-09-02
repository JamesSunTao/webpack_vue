const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode:"production",
    devtool: "cheap-module-source-map",
    module: {
        rules:[
          
            
        ]
    },
    plugins: [
       
    ],
}

module.exports = merge(commonConfig,prodConfig);