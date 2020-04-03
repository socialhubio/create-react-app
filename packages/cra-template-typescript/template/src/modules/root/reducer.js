import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import Actions from './actions';

const INITIAL_STATE = Immutable({
  features: {},
  permissions: [],
  loggedIn: false,
  changeLogVersionClicked: 0,
  settings: {}
});

const setSession = (state, { session }) => state.replace(session);

const fetchSettings = (state, { settings }) => state.set('settings', settings);

export const HANDLERS = {
  [Actions.Types.FETCH_SETTINGS]: fetchSettings,
  [Actions.Types.SET_SESSION]: setSession
};

export default createReducer(INITIAL_STATE, HANDLERS);
