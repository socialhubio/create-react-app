import moment from 'moment';
// import 'moment/src/locale/de';
// import 'moment/src/locale/en-gb';
import 'moment-timezone';

const initialise = () => {
  // Setup Moment Locale
  const { locale } = window.localStorage;
  // Force en locale to UK format DD/MM/YYYY
  // And support only en + de locales as of now
  moment.locale(locale === 'de' ? 'de' : 'en-gb');
  // Setup Default Timezone From The Users Browser (Best Guess)
  const browserTimezone = moment.tz.guess();
  moment.tz.setDefault(browserTimezone);
};

export default initialise;
