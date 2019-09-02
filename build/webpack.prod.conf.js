const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const { handleAssetsPath } = require('./utils');
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
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            inject: true,
            minify: {
                removeComments: true,   // remove HTML comments	
                removeAttributeQuotes: true, // remove the quotes from the attribute
                collapseWhitespace: true,   //collapse white space that contributes to text nodes in a document tree
            },
            chunks: ['manifest', 'vendor', 'main'],  // used for multiple entry 
            chunksSortMode: 'dependency'
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

const webpackConfig = merge(baseWebpackConfig, prodWebpackConfig);

module.exports = webpackConfig;