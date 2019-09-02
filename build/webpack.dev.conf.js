const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('../config');
const { createNotifierCallback } = require('./utils');

/**
 * @desc handle webpack-dev-server proxy
 * @param proxyConfig {array}, proxy host list
 * @return format proxy host obj list
 */
function proxyTable(proxyConfig) {
    const result = {};
    Object.keys(proxyConfig || {}).forEach(key => {
        result[key] = {
            target: proxyConfig[key],
            changeOrigin: true,
            // onProxyReq(proxyReq, req, res) {
            //     console.log(proxyReq, req, res, 'proxyReq, req, res', 'onProxyReq');
            // },
            // onProxyRes(proxyRes) {
            //     console.log(proxyRes, 'proxyRes', 'onProxyRes');
            // },
            // onError(err, req, res) {
            //     console.log(err, req, res, 'err, req, res', 'onError');
            // },
            pathRewrite: (() => {
                const pathRewriteResult = {};
                pathRewriteResult[`^${key}`] = '';
                return pathRewriteResult;
            })()
        }
    });
    return result;
}

const devWebpackConfig = {
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, '../index.html'),
            inject: true
        }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {   // compile success info
                messages: [`Your application is running here: http://${config.dev.host}:${config.dev.port}`],
            },
            onErrors: config.dev.notifyOnErrors ? createNotifierCallback() : undefined
        }),
        new webpack.HotModuleReplacementPlugin(),   // open HMR(Hot-Module-Replacement)
    ],
    devServer: {    // https://webpack.docschina.org/configuration/dev-server/
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        publicPath: config.dev.assetsPublicPath,
        hot: true,
        quiet: true, // necessary for FriendlyErrorsPlugin
        overlay: true,
        open: true,
        host: config.dev.host,
        port: config.dev.port,
        compress: true,
        proxy: proxyTable(config.dev.proxy)
        // historyApiFallback: {    // priority of use vue-router
        // 	rewrites: [
        // 		{
        //             from: /.*/,
        //             to: path.join(config.dev.pagePath, 'index.html')
        //         }
        // 	],
        // },
    }
};
const webpackConfig = merge(baseWebpackConfig, devWebpackConfig);
module.exports = webpackConfig;