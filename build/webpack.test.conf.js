const baseWebpackConfig = require('./webpack.base.conf');
const merge = require('webpack-merge');
const webpackConfig = merge(baseWebpackConfig);

module.exports = webpackConfig;