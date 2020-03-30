import { all, fork, takeEvery } from 'redux-saga/effects';

import RootActions from './actions';

export function* bootstrapSaga(){ // eslint-disable-line
  console.log('sagas are bootstrapping...')
}

export function* fetchSettings({ settings }){ // eslint-disable-line
  console.log(settings);
}

export default function* defaultSaga(){
  yield all([
    fork(bootstrapSaga),
    takeEvery(RootActions.Types.FETCH_SETTINGS, fetchSettings)
  ]);
}
