import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import RootActions from './actions';

export const INITIAL_STATE = Immutable({
  settings: {}
});

const fetchSettings = (state, { settings }) => state.set('settings', settings);

export const HANDLERS = {
  [RootActions.Types.FETCH_SETTINGS]: fetchSettings
};

export default createReducer(INITIAL_STATE, HANDLERS);
