const path = require('path');
const { handleAssetsPath, styleLoaders } = require('./utils');
const vueLoaderConfig = require('./vue-loader.conf');
const configType = process.env.NODE_ENV === 'production' ? 'build' :
    process.env.NODE_ENV === 'test' ? 'test' : 'dev';
const config = require('../config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const baseWebpackConfig = {
    entry: ['babel-polyfill', path.resolve(__dirname, '../src/main.js')],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: handleAssetsPath('js/[name].js'),
        // publicPath: config[configType].assetsPublicPath
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader', // loader name
                exclude: /node_modules/ // exclude node_modules
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240, // If the image file size is smaller than the limit, it will be rewritten as base64 and fill in the url.
                    name: handleAssetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: "url-loader",
                options: {
                    limit: 10240,
                    name: handleAssetsPath('font/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10240,
                    name: handleAssetsPath('media/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'], // Omit the import file extension
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, '../src'),
        }
    }
};

const { output: styleRules, ExtractRootCss, ExtractVueCss } = styleLoaders({
    sourceMap: config[configType].cssSourceMap,
    extract: config[configType].extract,
    usePostCSS: true
});

baseWebpackConfig.module.rules = [
    ...baseWebpackConfig.module.rules,
    ...styleRules
];

baseWebpackConfig.plugins = [
    ...baseWebpackConfig.plugins,
    ExtractRootCss,
    ExtractVueCss
];

module.exports = baseWebpackConfig;