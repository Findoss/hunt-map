const path = require('path');
const publicPath = path.join(__dirname, 'public');
const distPath = path.join(__dirname, 'public/build');

const VisualizerPlugin = require('webpack-visualizer-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Babel
const babelLoader = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader'
  }
};

// CSS
const cssLoader = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
};

// URL
const urlLoader = {
  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  use: {
    loader: 'url-loader?limit=100000'
  }
};

// HTML
const htmlLoader = {
  test: /\.html$/,
  use: {
    loader: 'html-loader'
  }
};

const webpackConfig = {
  entry: {
    main: './src/index.js'
  },
  output: {
    path: distPath,
    filename: 'bundle.js'
  },
  stats: 'minimal',
  devServer: {
    // publicPath: distPath,
    contentBase: [publicPath, path.join(__dirname, '/')],
    port: 9000,
    compress: true,
    open: true
  },
  module: {
    rules: [cssLoader, htmlLoader, babelLoader, urlLoader]
  }
};

if (process.env.NODE_ENV == 'production') {
  //
} else {
  webpackConfig.plugins = [
    new VisualizerPlugin({
      filename: './stat-webpack.html'
    }),
    new BundleAnalyzerPlugin({
      reportFilename: './analiz-webpack.html'
    })
  ];
  webpackConfig.devtool = 'eval-source-map';
}

module.exports = webpackConfig;
