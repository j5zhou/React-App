const path = require('path');
const nodeExternals = require('webpack-node-externals');

/*
const serverConfig = {
  entry: './server.js',
  output: {
    filename: 'server_index.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/preset-react']
          }
        }
      }
    ]
  },
  target:'node',
  externals:[nodeExternals()],
  node: {
      __dirname:false
  }
};
*/
const clientConfig = {
  entry: {
    home: './src/home/index.js',
    login: './src/login/login.js',
    server: "./server.js"
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
};

module.exports = clientConfig;


