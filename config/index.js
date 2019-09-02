'use strict'

module.exports = {
    build: {
        assetsPath: 'static',
        assetsPublicPath: '/',
        env: 'production',
        devtool: '#source-map',
        productionSourceMap: true,
        cssSourceMap: true,
        extract: true,
        cacheBusting: true
    },
    dev: {
        assetsPath: 'static',
        assetsPublicPath: '/',
        env: 'development',
        notifyOnErrors: true,
        host: 'dev-vue-spa-scaffold.yzmx.com',
        port: 8088,
        proxy: {
            '/v1': 'https://staging-mp.leica-camera.cn/api/v1'
        },
        devtool: 'cheap-module-eval-source-map',
        cssSourceMap: true,
        extract: false,
        cacheBusting: true
    },
    test: {
        env: 'test',
        assetsPublicPath: '/',
        assetsPath: 'static',
    }
};