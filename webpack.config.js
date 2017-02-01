const path = require('path');
const ngcWebpack = require('ngc-webpack');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        'npm-module-seed.umd': './dist/index.js',
        'npm-module-seed.umd.min': './dist/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/bundles'),
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'npm-module-seed'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: [
        /^\@angular\//,
        /^rxjs\//
    ],
    module: {
        rules: [
        ]
    },
    plugins: [
        new ngcWebpack.NgcWebpackPlugin({
            disabled: false,
            tsConfig: path.resolve(__dirname, 'tsconfig.json'),
            resourceOverride:  path.resolve(__dirname, 'config/resource-override.js')
        }),

        new UglifyJsPlugin({
            include: /\.min\.js$/,
            beautify: false,
            output: {
                comments: false
            },
            mangle: {
                screw_ie8: true
            },
            compress: {
                screw_ie8: true,
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
                negate_iife: false
            },
        }),
        
        new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        path.resolve(__dirname, './src'), // location of your src
        {} // a map of your routes 
      ),
    ]
};