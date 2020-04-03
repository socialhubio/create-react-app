import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import Actions from './actions';

export const INITIAL_STATE = Immutable({
  entities: []
});

const usersFetched = (state, { users }) => state.set('entities', Immutable(users));

export const HANDLERS = {
  [Actions.Types.USERS_FETCHED]: usersFetched
};

export default createReducer(INITIAL_STATE, HANDLERS);
