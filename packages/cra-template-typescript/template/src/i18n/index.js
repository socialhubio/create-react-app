import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import promisify from 'es6-promisify';

import initDateTime from './datetime';
import translations from './translations';

const fallbackLng = 'en';

const initialise = async () => {
  i18n.use(XHR);
  const init = promisify(i18n.init.bind(i18n));
  // Setup Date Time
  initDateTime();
  return init({
    lng: window.localStorage.locale,
    debug: true,
    fallbackLng,
    interpolation: { escapeValue: false },
    resources: translations
    // backend: { loadPath: locale => (translations[locale[0]] ? translations[locale[0]] : translations[fallbackLng]) }
  });
};

const factory = async () => {
  await initialise();
  window.i18n = i18n;
  return i18n;
};

export default factory;
