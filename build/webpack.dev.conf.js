const baseWebpackConfig = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin-for-multihtml');
const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('../config');
const { createNotifierCallback, getMultiEntry } = require('./utils');

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
                { from: /pageOne.*/, to: path.posix.join(config.dev.assetsPublicPath, 'pageOne.html') },
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
const pages = getMultiEntry('./src/views/**/*.html');
for (var page in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: page + '.html',
        template: pages[page], // 模板路径
        inject: true,
        chunks: [page],
        multihtmlCache: true
    };
    // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    devWebpackConfig.plugins.push(new HtmlWebpackPlugin(conf));
}
const webpackConfig = merge(baseWebpackConfig, devWebpackConfig);
module.exports = webpackConfig;