'use strict'
const path = require('path');
const config = require('../config');
const configType = process.env.NODE_ENV === 'production' ? 'build' :
    process.env.NODE_ENV === 'test' ? 'test' : 'dev';
const packageConfig = require('../package.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractRootCss = new ExtractTextPlugin({ filename: handleAssetsPath('style/root.[contenthash].css'), allChunks: false });
const ExtractVueCss = new ExtractTextPlugin({ filename: handleAssetsPath('style/[name].[contenthash].css'), allChunks: true });
/**
 * handle assets path
 * @param {string} subPath sub path
 */
function handleAssetsPath(subPath) {
    const publicPath = config[configType].assetsPath;
    return path.join(publicPath, subPath);
}

/**
 * Optimize console output information
 * @return {function}
 */
function createNotifierCallback() {
    const notifier = require('node-notifier');
    return (severity, errors) => {
        if (severity !== 'error') {
            return;
        }
        const error = errors[0];
        const filename = error.file && error.file.split('!').pop();

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png')
        })
    }
}

function styleLoaders(options) {
    const output = [];
    const loaders = cssLoaders(options);
    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    if(options.isVue) {
        return output;
    } else {
        return {
            output,
            ExtractRootCss,
            ExtractVueCss
        }
    }
}

function cssLoaders(options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
            minimize: true  // css code compression
        }
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap
        }
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap
                })
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return (options.isVue ? ExtractVueCss : ExtractRootCss).extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
    }
}

module.exports = {
    handleAssetsPath,
    createNotifierCallback,
    styleLoaders,
    cssLoaders
};