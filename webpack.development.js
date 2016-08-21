var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
      { test: /routes\.yml$/, loaders: ['coeus-router/lib/routes-loader', 'yaml'] },
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.(png|jpg|gif)$/, loaders: ['url?limit=10000'] }
    ]
  },
  entry: {
    'app': [ 
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      './app/index.js'
    ]
  },
  output: {
    path: __dirname + '/build',
    publicPath: 'http://localhost:3000/',
    filename: '[name].entry.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['commons', 'app'],
      template: './template/app.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};