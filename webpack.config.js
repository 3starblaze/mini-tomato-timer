const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: [
      'core-js/stable',
      'regenerator-runtime/runtime',
      './src/index.js',
    ],
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.ts/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.s[ac]ss/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(mp3|wav|png)$/,
        include: path.resolve(__dirname, 'src/assets'),
        loader: 'file-loader',
      },
      {
        test: /\.svg/,
        loader: 'vue-svg-loader',
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
  ],
};
