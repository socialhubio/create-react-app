// Performance Loading Translation Files

// Translation Files (Will Not Be Loaded Into JS File)
// These Will Only Be Processed By The Webpack File-Loader (Not JSON Loader)
/* eslint-disable import/no-webpack-loader-syntax */
export default {
  en: require('../assets/translations/en.json'),
  de: require('../assets/translations/de.json')
};
/* eslint-enable import/no-webpack-loader-syntax */
