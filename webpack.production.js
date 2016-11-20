var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entry = [ './app/index.js' ];
if (process.env.POLYFILL) {
  // Promise & Object.assign
  entry = [
    'expose?Promise!coeus/lib/polyfill/Promise.js',
    'coeus/lib/polyfill/Object.assign.js'
  ].concat(entry);
}

module.exports = {
  resolve: {
    alias: {
      'react': 'react-lite',
      'react-dom': 'react-lite'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
      { test: /routes\.yml$/, loaders: ['coeus-router/lib/routes-loader', 'yaml'] },
      { test: /\.css$/, loaders: ['style', 'css'] },
      { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.(png|jpg|gif)$/, loaders: ['url?limit=10000'] }
    ]
  },
  entry: {
    'app': entry
  },
  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name].entry.js',
    chunkFilename: '[id].chunk.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['commons', 'app'],
      template: './template/app.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.js",
      minChunks: 2,
    }),
    //new webpack.optimize.UglifyJsPlugin()
  ]
};
