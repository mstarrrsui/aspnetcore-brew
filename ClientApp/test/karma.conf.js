// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html
const path = require('path');
const clientBundleOutputDir = '../../wwwroot/dist';
const webpack = require('webpack');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = function(config) {
    config.set({
        basePath: '.',
        frameworks: ['jasmine'],
        files: [
            '../../wwwroot/dist/vendor.js',
            './boot-tests.ts'
        ],
        preprocessors: {
            './boot-tests.ts': ['webpack', 'sourcemap']
        },
        reporters: ['mocha', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['Chrome'],
        mime: { 'text/x-typescript': ['ts', 'tsx'] },
        singleRun: false,



        webpack: {
            stats: { modules: false },
            context: path.resolve(__dirname, "../.."),
            resolve: { extensions: ['.js', '.ts'] },
            output: {
                filename: '[name].js',
                publicPath: '/dist/', // Webpack dev middleware, if enabled, handles requests for this URL prefix
                path: path.join(__dirname, './wwwroot/dist')
            },
            module: {
                rules: [
                    { test: /\.ts$/, include: /ClientApp/, use: ['awesome-typescript-loader?silent=true', 'angular2-template-loader'] },
                    { test: /\.html$/, use: 'html-loader?minimize=false' },
                    { test: /\.css$/, use: ['to-string-loader', 'css-loader'] },
                    { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
                ]
            },
            entry: { 'main-client': './ClientApp/boot-client.ts' },
            plugins: [new CheckerPlugin(),
                new webpack.DllReferencePlugin({
                    context: __dirname,
                    manifest: require('../../wwwroot/dist/vendor-manifest.json')
                }),
                new webpack.SourceMapDevToolPlugin({
                    test: /\.(ts|js)($|\?)/i
                })
            ],
            devtool: 'inline-source-map'
        },

        webpackMiddleware: { stats: 'errors-only' }
    });
};