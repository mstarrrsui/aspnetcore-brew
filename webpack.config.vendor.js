const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

module.exports = (env) => {
    const extractCSS = new ExtractTextPlugin('vendor.css');
    const extractAppCSS = new ExtractTextPlugin('app.css');
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        resolve: { extensions: ['.js'] },
        module: {
            rules: [
                { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' },
                { test: /\.css(\?|$)/, exclude: path.resolve(__dirname, 'ClientApp/styles/app'), use: extractCSS.extract({ use: 'css-loader' }) },
                { include: path.resolve(__dirname, 'ClientApp/styles/app'), use: extractAppCSS.extract({ use: 'css-loader' }) }

            ]
        },
        entry: {
            vendor: [
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/http',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
                '@angular/platform-server',
                //'angular2-universal',
                //'angular2-universal-polyfills',
                'bootstrap',
                //'bootstrap/dist/css/bootstrap.css',
                './ClientApp/styles/bootstrap/bootstrap.min.css',
                './ClientApp/styles/app/styles.css',
                'reflect-metadata',
                'es6-shim',
                'es6-promise',
                'event-source-polyfill',
                'jquery',
                'toastr',
                'zone.js',
            ]
        },
        output: {
            publicPath: '/dist/',
            filename: '[name].js',
            library: '[name]_[hash]',
            path: path.join(__dirname, 'wwwroot', 'dist')
        },
        plugins: [
            new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }), // Maps these identifiers to the jQuery package (because Bootstrap expects it to be a global variable)
            new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './ClientApp')), // Workaround for https://github.com/angular/angular/issues/11580
            new webpack.IgnorePlugin(/^vertx$/), // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
            extractCSS,
            extractAppCSS,
            new webpack.DllPlugin({
                path: path.join(__dirname, 'wwwroot', 'dist', '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ]),
    };

    const clientBundleConfig = merge(sharedConfig, {

    });

    return [clientBundleConfig];
}