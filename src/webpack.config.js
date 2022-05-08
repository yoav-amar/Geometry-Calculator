const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    'index': path.resolve(__dirname, 'scripts/index.js'),
    'calculator':path.resolve(__dirname, 'scripts/calculator.js'),
    'sign_in':path.resolve(__dirname, 'scripts/sign_in.js'),
    'sign_up':path.resolve(__dirname, 'scripts/sign_up.js'),
    'settings':path.resolve(__dirname, 'scripts/settings.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'static'),
  },
  resolve: {
    alias: {
      css_files: path.resolve(__dirname, 'scripts/css_files'),
      js_files: path.resolve(__dirname, 'scripts/js_files')
    },
  },
  module: { rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.css$/i,
      use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
  ]},
  watch: true, // for developing this will track changes
};