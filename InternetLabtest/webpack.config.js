const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isGitHubPages = process.env.GITHUB_PAGES === 'true';

  const publicPath = isGitHubPages ? 'https://yourusername.github.io/internetLabTest/' : '';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
      publicPath: publicPath
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
            publicPath: `${publicPath}images/`
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]',
            publicPath: `${publicPath}fonts/`
          }
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            sources: {
              list: [
                //...,
                {
                  tag: 'img',
                  attribute: 'src',
                  type: 'src',
                },
                {
                  tag: 'link',
                  attribute: 'href',
                  type: 'src',
                  filter: (tag, attribute, attributes, resourcePath) => {
                    return attributes.rel === 'stylesheet' || attributes.rel === 'preload';
                  },
                },
              ]
            }
          }
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
      }),
      ...(isProduction ? [new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash].css',
      })] : []),
    ],
    devServer: {
      static: './dist',
      hot: true,
      open: true,
      port: 3000,
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
  };
};