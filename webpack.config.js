const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require('webpackbar');
const portfinder = require('portfinder');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const address = require('address');
const chalk = require('chalk');
const { VueLoaderPlugin } = require('vue-loader');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const isProduction = NODE_ENV == 'production';

const modeMap = {
    production: 'production',
    development: 'development',
};

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader';

const OptimizationMap = {
    development: {
        chunkIds: 'named',
        moduleIds: 'named',
        usedExports: false, // 树摇
        splitChunks: {
            chunks: 'all',
            minSize: 1024 * 20,
            maxSize: 1024 * 500,
            minChunks: 2,
        },
        runtimeChunk: {
            name: 'runtime',
        },
    },
    production: {
        chunkIds: 'deterministic',
        moduleIds: 'deterministic',
        usedExports: true, // 树摇
        splitChunks: {
            chunks: 'all',
            minSize: 1024 * 20,
            // maxSize: 1024 * 244, // 拆包会导致包数激增,不拆的话可能会出现单包过大的问题
            minChunks: 2, // 分包不能太细 不合并导致并发请求过多 浏览器有并发请求数量限制
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: 1,
                },
            },
        },
        // 将 optimization.runtimeChunk 设置为 true 或 'multiple'，会为每个入口添加一个只含有 runtime 的额外 chunk。
        runtimeChunk: {
            name: 'runtime',
        },
        minimize: true, // 开发模式下如果不显式的将此处设置为true，下面的minimizer疑似不生效？试验过了前面的猜想极有可能是真的，应该在文档中的某个位置，但是我没找到，在css-minimizer-webpack-plugin这个文档中隐含的提到过一句
        minimizer: [
            new TerserPlugin({
                parallel: true, // 多线程
                extractComments: false, // 注释单独提取
                terserOptions: {
                    compress: {
                        drop_console: true, // 清除console输出
                    },
                    format: {
                        comments: false, // 清除注释
                    },
                    toplevel: true, //  声明提前
                    keep_classnames: true, // 类名不变
                },
            }),
            new CssMinimizerPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
    },
};

const config = {
    mode: modeMap[NODE_ENV] || 'development',
    stats: 'errors-only',
    entry: './src/app.js',
    infrastructureLogging: {
        level: 'error',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: isProduction ? 'js/[name].[contenthash:6].bundle.js' : 'js/[name].bundle.js',
        chunkFilename: isProduction ? 'js/chunk_[name]_[contenthash:6].js' : 'js/chunk_[name].js',
        clean: true, // 在生成文件之前清空 output 目录
    },
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename],
        },
    },
    devServer: {
        hot: true,
        compress: true,
        host: '0.0.0.0',
        port: '9191',
        open: false,
        client: {
            logging: 'error',
            overlay: false,
        },
        liveReload: false,
        historyApiFallback: {
            rewrites: [
                {
                    from: /\//,
                    to: '/index.html',
                },
            ],
        },
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.ts', '.html'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            vue$: 'vue/dist/vue.esm.js',
        },
    },
    optimization: OptimizationMap[NODE_ENV],
    plugins: [
        new VueLoaderPlugin(),
        new WebpackBar(),
        new HtmlWebpackPlugin({
            template: './public/index.spa.html',
            favicon: path.resolve(__dirname, './public/favicon.ico'),
        }),
        new CopyPlugin({
            patterns: [{ from: path.resolve(__dirname, 'public'), to: 'public' }],
        }),
    ],
    module: {
        rules: [
            // vue-loader必须要在最外层,不能放入oneOf
            {
                test: /\.vue$/i,
                include: [path.resolve(__dirname, 'src')],
                exclude: /node_modules/,
                use: ['vue-loader'],
            },
            {
                oneOf: [
                    {
                        test: /\.(js|jsx)$/i,
                        exclude: /node_modules/,
                        use: ['thread-loader', 'babel-loader'],
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: [
                            stylesHandler,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 2,
                                    modules: {
                                        mode: 'icss',
                                    },
                                },
                            },
                            'postcss-loader',
                            'sass-loader',
                        ],
                    },
                    {
                        test: /\.css$/i,
                        use: [
                            stylesHandler,
                            {
                                loader: 'css-loader',
                                options: {
                                    importLoaders: 1,
                                },
                            },
                            'postcss-loader',
                        ],
                    },
                    {
                        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                        type: 'asset',
                        parser: {
                            dataUrlCondition: {
                                maxSize: 10000,
                            },
                        },
                    },
                ],
            },
        ],
    },
};

module.exports = (env, argv) => {
    const APP_ENV = env.APP_ENV || 'development';
    config.plugins.push(
        new Dotenv({
            path: `./.env.${APP_ENV}`,
        })
    );
    return new Promise((resolve) => {
        if (isProduction) {
            config.plugins.push(
                new MiniCssExtractPlugin({
                    filename: 'styles/[name].[contenthash:6].css',
                }),
                new CompressionPlugin({
                    test: /\.(css|js)$/,
                    minRatio: 0.7,
                })
            );
            resolve(config);
        } else {
            config.devtool = 'cheap-module-source-map';
            portfinder.basePort = config.devServer.port;
            portfinder.getPort((err, port) => {
                if (err) {
                    reject(err);
                } else {
                    const LOCAL_IP = address.ip();
                    // publish the new Port, necessary for e2e tests
                    process.env.PORT = port;
                    // add port to devServer config,主要是这一步更新可用的端口
                    config.devServer.port = port;
                    // Add FriendlyErrorsPlugin
                    config.plugins.push(
                        new FriendlyErrorsWebpackPlugin({
                            compilationSuccessInfo: {
                                messages: [
                                    `  App running at:`,
                                    `  - Local:   ` + chalk.cyan(`http://localhost:${port}`),
                                    `  - Network: ` + chalk.cyan(`http://${LOCAL_IP}:${port}`),
                                ],
                            },
                            clearConsole: true,
                        })
                    );
                    resolve(config);
                }
            });
        }
    });
};
