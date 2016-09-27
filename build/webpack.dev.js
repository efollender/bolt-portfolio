const webpack = require('webpack');
const argv = require('yargs').argv;
const resolve = require('path').resolve;
const extname = require('path').extname;
const fs = require('fs');
const yaml = require('write-yaml');
const yamljs = require('yamljs');
const stylusLoader = "style-loader!css-loader?minimize!stylus-loader";
const PORT = parseInt((4000), 10) + 1;

//PATHS
const PUBLIC_PATH = 'http://localhost:' + PORT + '/dist/';
const HMR_ROOT = 'http://localhost:' + PORT + '/';
const HMR = '__webpack_hmr';
const DIST = resolve('public', 'theme', 'elf-theme', 'dist');
const ENTRY = resolve('public', 'theme', 'elf-theme', 'src');
const BOLT_CONFIG = resolve('public', 'theme', 'elf-theme','theme.yml');

function WriteStatsPlugin() {
  const args = [].slice.call(arguments);
  const destination = args.shift();

  return function writeStats() {
    this.plugin('done', stats => {
      const assets = {
        'js': [PUBLIC_PATH + 'bundle.js']
      };
      yamljs.load(BOLT_CONFIG, config => {
        config['node'] = assets;
        yaml.sync(destination, config);
      });
    });
  };
};

module.exports = {
  name: 'Site Client',
  entry: {
    bundle: [
      'babel-polyfill',
      ENTRY,
      'webpack-hot-middleware/client?path=' + HMR_ROOT + HMR
    ],
  },
  output: {
    path: '/',
    publicPath: PUBLIC_PATH,
    filename: '[name].js',
  },
  module: {
    loaders: [{
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file?name=fonts/[name].[ext]'
        + '&limit=10000&minetype=application/font-woff',
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      include: /font/,
      loader: 'file?name=fonts/[name].[ext]',
    }, {
      test: /\.(jpe?g|png|gif|svg)$/,

      loader: 'file?name=assets/[name].[ext]',
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loader: 'style!css',
    }, {
      test: /\.styl$/,
      loader: stylusLoader
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  stylus: {
    use: [require('nib')(), require('rupture')()]
  },
  plugins: [
    // new webpack.NoErrorsPlugin(),
    new WriteStatsPlugin(
      `public/theme/elf-theme/theme.yml`,
      '/dist/'
    ),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
};
