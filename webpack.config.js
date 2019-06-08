const path = require('path');
const distPath = path.join(__dirname, 'dist');
const publicPath = path.join(__dirname, 'public');

const BabiliPlugin = require('babili-webpack-plugin');

// Babel loader for Transpiling ES8 Javascript for browser usage
const babelLoader = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
};

// CSS
const cssLoader = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader']
};

// URL loader to resolve data-urls at build time
const urlLoader = {
  test: /\.(png|woff|woff2|eot|ttf|svg)$/,
  use: {
    loader: 'url-loader?limit=100000'
  }
};

// HTML load to allow us to import HTML templates into our JS files
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

if (process.env.NODE_ENV === 'production') {
  webpackConfig.plugins = [new BabiliPlugin({})];
} else {
  webpackConfig.devtool = 'eval-source-map';
}

module.exports = webpackConfig;
