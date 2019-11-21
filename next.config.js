/* eslint-disable import/no-extraneous-dependencies, no-param-reassign */
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    // eslint-disable-next-line
    config.node = {
      fs: 'empty',
    };
    return config;
  },
});
