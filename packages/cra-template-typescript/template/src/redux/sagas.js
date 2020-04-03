import { fork, all } from 'redux-saga/effects';
// BS Sagas
import notificationSagas from 'bananasplit/modules/notifications/sagas';
// Module Sagas
import navbarSagas from '../modules/root/navbar/sagas';
import apiSagas from '../modules/root/api-sagas';
import rootSagas from '../modules/root/sagas';
import usersSagas from '../modules/user/sagas';


// Start The Saga Daemons
export default function* root(){
  yield all([
    fork(rootSagas),
    fork(navbarSagas),
    fork(apiSagas),
    fork(notificationSagas),
    fork(usersSagas)
  ]);
}
