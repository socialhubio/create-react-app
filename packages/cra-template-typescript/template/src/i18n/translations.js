// Performance Loading Translation Files

// Translation Files (Will Not Be Loaded Into JS File)
// These Will Only Be Processed By The Webpack File-Loader (Not JSON Loader)
/* eslint-disable import/no-webpack-loader-syntax */

const translations = {
  en: { translation: require('../assets/translations/en.json') },
  de: { translation: require('../assets/translations/de.json') }
};

export default translations;
/* eslint-enable import/no-webpack-loader-syntax */
