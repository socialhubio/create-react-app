import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import { reducer as form } from 'redux-form';

import root from '../modules/root/reducer';

// Combine All The Sub Reducers Into One For Redux
export default (history) => combineReducers({
  form,
  router: connectRouter(history),
  root
});
