var path = require('path');

module.exports = {
  entry: './app/scripts/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
