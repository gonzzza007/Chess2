var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './js/app.js',
    output: {
        path: path.resolve(__dirname, ""),
        // path: __dirname,
        filename: 'bundle.js'
    },
    // mode: 'development',
    // mode: 'production',
    // optimization: {
        // usedExports: true
    // },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'js'),
                exclude: /(node_modules|bower_components)/,
                query: {
                  presets: 'es2015'
                }
            }
        ],
        rules: [
            {
              test: /three\/examples\/js/,
              use: 'imports-loader?THREE=three',
              query: {
                    compact: true,
                    presets: [
                        ['es2015', {modules: false}]
                    ]
                }
            }
        ]
    },
    resolve: {
        alias: {
            'three/SVGLoader': path.join(__dirname, './node_modules/three/examples/js/loaders/SVGLoader.js')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            'THREE': 'three'
        }),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};
