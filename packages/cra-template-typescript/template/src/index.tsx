import React from 'react';
import ReactDOM from 'react-dom';
import cookie from 'js-cookie';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import qs from 'query-string';

import Router from './router';
import createStore from './redux/store/factory';
import i18nFactory from './i18n';
import './index.css';
import { api, api2 } from './shared/api';

// Setup The API Authentication. Intentionally Simple To Get The Ball Rolling.
let accessToken;

// Attempt to load accessToken from url (used in external approval)
const query = qs.parse(window.location.search);
accessToken = query.accesstoken;

if (!accessToken) {
  accessToken = cookie.get('masked_accesstoken') || cookie.get('accesstoken');
}
api.authenticate(accessToken);
api2.authenticate(accessToken);

// Create The App Wide Redux Store (+ Middleware)
const store = createStore();

// Root Level Render Of React Application
const Application = ({ i18n }) => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Router />
      </I18nextProvider>
    </Provider>
  );
};

// Load The i18n Translations
i18nFactory().then((i18n) => {
  ReactDOM.render(
    <Application i18n={i18n} />,
    document.getElementById('root')
  );
});
