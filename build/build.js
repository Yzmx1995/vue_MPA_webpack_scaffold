'use strict'
const ora = require('ora');
const spinner = ora('building for production...');
spinner.start();

process.env.NODE_ENV = process.env.NODE_ENV || 'production';
const webpack = require('webpack')
const configType = process.env.NODE_ENV === 'production' ? 'prod' :
                    process.env.NODE_ENV === 'test' ? 'test' : 'dev';
const webpackConfig = require(`./webpack.${configType}.conf`);

webpack(webpackConfig, (err, stats) => {
    spinner.stop();
});