import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as router } from 'react-router-redux';

// BS Reducers
import notification from 'bananasplit/modules/notifications/reducer';
import navigationBar from 'bananasplit/components/navbar/reducer';

// Module reducers
import session from '../modules/root/reducer';
import api from '../modules/root/api-reducer';
import users from '../modules/user/reducer';

// Combine All The Sub Reducers Into One For Redux
export default (history) => combineReducers({
  navigationBar,
  notification,
  api,
  form,
  router,
  session,
  users
});
