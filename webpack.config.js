const path = require('path');
const rootPath = path.join(__dirname, '/');
const publicPath = path.join(__dirname, 'public');
const distPath = path.join(__dirname, 'build');

const VisualizerPlugin = require('webpack-visualizer-plugin');
const InjectPlugin = require('webpack-inject-plugin').default;
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
    publicPath: '/build/',
    contentBase: [rootPath, publicPath],
    port: 9000,
    compress: true,
    open: true
  },
  module: {
    rules: [cssLoader, htmlLoader, babelLoader, urlLoader]
  }
};

if (process.env.NODE_ENV == 'production') {
  webpackConfig.plugins = [
    new InjectPlugin(function() {
      const version = `console.log("ver ${String(process.env.npm_package_version)}");`;
      return version;
    }),
    new VisualizerPlugin({
      filename: './bundle-stat.html'
    })
  ];
} else {
  webpackConfig.plugins = [
    new InjectPlugin(function() {
      const version = `console.log("${String(process.env.npm_package_version)}");`;
      return version;
    })
    // new VisualizerPlugin({
    //   filename: './bundle-stat.html'
    // })
    // new BundleAnalyzerPlugin({
    //   reportFilename: './analiz-webpack.html'
    // })
  ];
  webpackConfig.devtool = 'eval-source-map';
}

module.exports = webpackConfig;
