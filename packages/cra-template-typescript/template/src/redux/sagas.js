import { fork, all } from 'redux-saga/effects';

import rootSagas from '../modules/root/sagas';

// Start The Saga Daemons
export default function* root(){
  yield all([
    fork(rootSagas)
  ]);
}
