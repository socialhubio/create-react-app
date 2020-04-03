import { all, call, fork, select, takeEvery } from 'redux-saga/effects';

import intercom from 'bananasplit/services/intercom';
import zendesk from 'bananasplit/services/zendesk';
import analytics, { LOGIN } from 'bananasplit/services/analytics';

import { getBrowserAppVersion } from './selectors';
import { getAuthenticatedUser } from '../user/selectors';
import { fetchUsers, fetchUserDetails } from '../user/sagas';
import RootActions from './actions';

export function* bootServicesSaga() {
  try {
    // const session = yield select(getSession);
    const user = yield select(getAuthenticatedUser);
    const browserAppVersion = yield select(getBrowserAppVersion);
    // Turn On Intercom
    yield call([intercom, intercom.start], user, browserAppVersion);
    // Update Zendesk Identification
    yield call([zendesk, zendesk.identify], user);
    // Log into firebase
    yield call([analytics, analytics.logEvent], LOGIN);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

/**
 * Bootstrap saga is being called upon starting the application (right after routing is initialized).
 * Please use this saga as a good opportunity to do any initialization logic.
 */

export function* bootstrapSaga() {
  yield call(fetchUsers);
  yield call(fetchUserDetails);
  yield call(bootServicesSaga);
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
