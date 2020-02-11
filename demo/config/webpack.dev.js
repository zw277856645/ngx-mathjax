const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { AngularCompilerPlugin } = require('@ngtools/webpack');
const { IndexHtmlWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/index-html-webpack-plugin');

const commonConfig = require('./webpack.common.js');

module.exports = webpackMerge(commonConfig, {

    mode: "development",

    devtool: 'eval-map',

    output: {
        filename: '[name].js',
    },

    plugins: [
        new IndexHtmlWebpackPlugin({
            input: './index.html',
            output: 'index.html',
            entrypoints: [
                'polyfills',
                'vendor',
                'app'
            ]
        }),
        new AngularCompilerPlugin({
            mainPath: './main.ts',
            tsConfigPath: './demo/tsconfig-demo.json',
            sourceMap: true,
            nameLazyFiles: true,
            skipCodeGeneration: true
        }),
        new webpack.DefinePlugin({ 'process.env.PRODUCTION': false })
    ],

    devServer: {
        historyApiFallback: true,
        watchOptions: {
            ignored: [
                'node_modules',
                '**/*.spec.ts'
            ]
        }
    }
});
