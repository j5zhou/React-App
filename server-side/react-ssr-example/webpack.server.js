const path = require('path');
const nodeExternals = require('webpack-node-externals');

const serverConfig = {
  entry: './server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve('server-build'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
};

const clientConfig = {
  entry: './src/App.js',
  output: {
    path: path.resolve(__dirname,'public'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
    ]
  }
};

module.exports =[serverConfig,clientConfig];