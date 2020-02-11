const rxPaths = require('rxjs/_esm5/path-mapping');
const { SuppressExtractedTextChunksWebpackPlugin } = require('@angular-devkit/build-angular/src/angular-cli-files/plugins/suppress-entry-chunks-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {

    node: false,

    entry: {
        'polyfills': './demo/polyfills.ts',
        'vendor': './demo/vendor.ts',
        'app': './demo/main.ts'
    },

    resolve: {
        extensions: [ '.ts', '.js' ],
        alias: rxPaths()
    },

    performance: {
        hints: false
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: '@ngtools/webpack'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /component\.(css|less)$/,
                use: [
                    'to-string-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            {
                test: /(?<!(component|semantic))\.(css|less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            },
            // semantic-ui-css google fonts 特殊处理，less-loader 对 url fonts 处理有 bug
            {
                test: /semantic\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            // 资源转换成base64，超出limit交给file-loader处理
            {
                test: /\.(png|svg|jpe?g|gif|woff|woff2|eot|ttf|ico)$/,
                loader: 'url-loader',
                options: {
                    name: 'asset/[name].[hash].[ext]',
                    limit: 100000
                }
            },
            // 隐藏webpack抛出的deprecation警告
            {
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true },
            }
        ]
    },

    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                common: {
                    name: 'common',
                    chunks: 'all',
                    minChunks: 2,
                    enforce: true
                }
            }
        }
    },

    plugins: [
        new ProgressPlugin(),
        // 避免样式入口文件(entry -> style.css)生成对应的js(style.js)
        new SuppressExtractedTextChunksWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: '[name].[hash].css' }),
        new CircularDependencyPlugin({ exclude: /node_modules/ })
    ]
};

