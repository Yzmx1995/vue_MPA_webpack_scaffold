# Project description
- This is a vue multiple page application scaffolding built with webpack.
# Features
- 1.babel(handle .js,convert es6 to es5)

- 2.file-loader(handle file path) && url-loader(encode files when it's size smaller than limited,reduce the number of http request)

- 3.some style loader(handle .css)

- 4.vue-loader(handle .vue)

- 5.html-webpack-plugin(generate html file)

- 6.friendly-errors-webpack-plugin&&node-notifier(optimize the information of error and console)

- 7.webpack-dev-server(provide hot module replace during the development)

- 8.extract-text-webpack-plugin(pull style code out to separate file)

- 9.webpack.optimize.CommonsChunkPlugin(extract multiple used code)

- 10.uglifyjs-webpack-plugin(compression .js)

# Project directory

|-- build   // webpack build config

    |-- build.js    // entry file

    |-- logo.png    // error logo

    |-- utils.js    // some public function

    |-- vue-loader.conf.js  // vue-loader config

    |-- webpack.base.conf.js    // public config

    |-- webpack.dev.conf.js // development environment config 

    |-- webpack.prod.conf.js    // production environment config

    |-- webpack.test.conf.js    // test environment config


|-- config
    |-- index.js    // config object of different environments

|-- dist    // output directory

    |-- static  // static file
    
        |-- img // img file
        
        |-- js  // js file
        
        |-- style   // css file
        
        |-- font    // font file
        
        |-- media   // media file
        
    |-- index.html  // html file
    

|-- node_modules    // dependency package file

|-- src

    |-- assets  // public resource file
    
        |-- css // some css file
        
        |-- images  // some image file
        
        |-- js  // some js file
        
        |-- plugin  // some plugin
        
            |-- axios.js    // package axios instance
            
            |-- handleError.js  // package handle error
            
    |-- views  // page components
    
    |-- router
    
        |-- index.js    // router config
        
    |-- App.vue // entry vue file
    
    |-- main.js // entry js file
    

|-- static  // some static file,copy-webpack-plugin will handle it.

|-- favicon.png // useless

|-- .babelrc    // babel config

|-- .gitignore  // git ignore config

|-- .postcssrc.js   // postcss config

|-- index.html  // template for dist/index.html

|-- package.json    // project dependency file

|-- ReadMe.md   // some information about this project

