var path = require('path');

module.exports = {
  entry: './app/scripts/index.js',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff|ttf|woff2)$/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(jpeg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
};
