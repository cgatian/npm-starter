const path = require('path');
const ngcWebpack = require('ngc-webpack');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        'npm-module-seed.umd': './dist/index.js',
        // 'npm-module-seed.umd.min': './dist/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist/bundles'),
        filename: '[name].js',
        libraryTarget: 'commonjs',
        library: 'npm-module-seed'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    // externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: 'tsconfig.json'
                        }
                    },
                    {
                        loader: 'angular2-template-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.css$/,
                use: ['to-string-loader', 'css-loader']
            }
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
            // beautify: true, //debug
            // mangle: false, //debug
            // dead_code: false, //debug
            // unused: false, //debug
            // deadCode: false, //debug
            // compress: {
            //   screw_ie8: true,
            //   keep_fnames: true,
            //   drop_debugger: false,
            //   dead_code: false,
            //   unused: false
            // }, // debug
            // comments: true, //debug


            beautify: false, //prod
            output: {
                comments: false
            }, //prod
            mangle: {
                screw_ie8: true
            }, //prod
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
                negate_iife: false // we need this for lazy v8
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