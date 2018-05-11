var path = require('path');

module.exports = {
  entry: {
    demo: "./example/demo.js",
    mopx: './src/mobx.js'
  },
  output: {
    path: path.resolve(__dirname,'build'),
    filename: "[name].js"
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
  },
  devtool: 'source-map',
}