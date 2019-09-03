const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const { handleAssetsPath, getMultiEntry } = require('./utils');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('../config');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;   // add "webpack-bundle-analyzer": "^3.4.1" in package.json

const prodWebpackConfig = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: handleAssetsPath('js/[name].[chunkhash:8].js')
    },
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false
                }
            },
            sourceMap: config.build.productionSourceMap,
            parallel: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'main',
            async: 'vendor-async',
            children: true,
            minChunks: 3
        }),
        // new BundleAnalyzerPlugin()
    ]
};

const pages = getMultiEntry('./src/views/**/*.html')
for (var page in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: page + '.html',
        template: pages[page], //模板路径
        inject: true,
        chunks: ['manifest', 'vendor', page],
        minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
    }
    prodWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
}

const webpackConfig = merge(baseWebpackConfig, prodWebpackConfig);

module.exports = webpackConfig;