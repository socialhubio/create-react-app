const { DefinePlugin } = require('webpack');
const pckg = require('./package');

module.exports = {
  webpack: {
    alias: {
      'bananasplit': 'bananasplit/dist'
    },
    plugins: [
      new DefinePlugin({
        'process.env': {
          APP_VERSION: JSON.stringify(pckg.version),
          BASE_URL: JSON.stringify('/meet')
        }
      })
    ]
  }
};
