var path = require('path');

module.exports = {
  entry: "./src/mopx.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [ 'es2015' ],
          plugins: [
              'transform-decorators-legacy',
              'transform-class-properties',
          ],
          babelrc: false
        }
      }
    ]
  }
}