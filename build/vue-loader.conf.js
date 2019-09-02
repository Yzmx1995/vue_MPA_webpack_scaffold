'use strict'
const { cssLoaders } = require('./utils');
const config = require('../config');
const configType = process.env.NODE_ENV === 'production' ? 'build' :
                    process.env.NODE_ENV === 'test' ? 'test' : 'dev';

module.exports = {
  loaders: cssLoaders({
    sourceMap: config[configType].cssSourceMap,
    extract: config[configType].extract,
    isVue: true
  }),
  cssSourceMap: config[configType].cssSourceMap,
  cacheBusting: config[configType].cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
