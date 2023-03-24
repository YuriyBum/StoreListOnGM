const path = require('path');
const dotenv = require('dotenv')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Modes = {
    DEVELOPMENT: 'development',
    PRODUCTION: 'production',
};

dotenv.config();

module.exports = (env, { mode }) => {
    const isProduction = mode === Modes.PRODUCTION;

    return {
        mode,
        entry: path.join(__dirname, 'src', 'index.tsx'),
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
        },
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.?js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.(css|scss)?$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },
                {
                    test: /\.(png|jp(e*)g|gif|webp|avif)$/,
                    use: ['file-loader'],
                },
				{
                    test: /\.(json)$/,
                    loader: 'file-loader',
					options: {
                        name: '/public/icons/[name].[ext]'
                    }
                },
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ],
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(process.env)
             }),
            new HtmlWebpackPlugin({
                template: path.join(__dirname, 'src', 'index.html'),
                favicon: path.join(__dirname, 'src', 'assets/images/favicon.ico'),
            }),
			new CopyWebpackPlugin({
            patterns: [
                { from: 'public' }
            ]
            })
        ],

        performance: {
            maxEntrypointSize: Infinity,
            maxAssetSize: 1024 ** 2,
        },

        devtool: isProduction ? 'source-map' : 'inline-source-map',

        devServer: {
            host: 'localhost',
            port: 3000,
            historyApiFallback: true,
        },
    };
};
