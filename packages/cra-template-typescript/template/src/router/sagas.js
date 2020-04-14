import { all, takeEvery, call, put, select } from 'redux-saga/effects';
import { navigateToOriginLink } from 'bananasplit/shared/url';
import NotificationActions from 'bananasplit/modules/notifications/actions';
import * as NotificationToastTypes from 'bananasplit/modules/notifications/constants/notification-toast-types';
import { WELCOME } from 'bananasplit/constants/routes';
import { INSUFFICIENT_PERMISSIONS } from 'bananasplit/modules/notifications/constants/error-keys';

import RootActions from '../modules/root/actions';
import { push } from 'router/effects';
import { getPathname, getURLQuery } from 'router/selectors';
import {
  PACKAGE_EXPIRED,
  TRIAL_PERIOD_EXPIRED_ERROR,
  UNSUPPORTED_FILE_TYPE
} from '../constants/error-types';

const PACKAGE_URL = 'package';

// Inter-App Navigate To Link
export function* navigateToLink({ link }){
  yield call(navigateToOriginLink, link);
}

export function* onApiError({ code, status, message = '', data }){
  const pathname = yield select(getPathname);
  // Redirect not authenticated user to login page
  if (pathname !== WELCOME && (code === 401 || message.includes('accesstoken'))){
    const query = yield select(getURLQuery);
    const url = `/${PACKAGE_URL}${pathname}${query}`;
    yield call(push, `${WELCOME}?redirect=${encodeURIComponent(url)}`);
  }
  // Redirect if package expired
  if ((code === 402 && status === PACKAGE_EXPIRED)
    || (code === 403 && status === TRIAL_PERIOD_EXPIRED_ERROR)){
    yield call(navigateToLink, { link: 'inbox/#packages' });
  }
  // Generic error notification fallback
  let errorMessage;
  if (code === 403 && status === INSUFFICIENT_PERMISSIONS){
    errorMessage = INSUFFICIENT_PERMISSIONS;
  }
  if (status === UNSUPPORTED_FILE_TYPE){
    errorMessage = UNSUPPORTED_FILE_TYPE;
  }
  yield put(NotificationActions.Creators.showNotification(
    NotificationToastTypes.ERROR,
    status,
    errorMessage || status,
    code,
    'media-lib',
    true, // should be dismissable
    false, // autohide set to false
    data
  ));
}

export default function* routerSagas(){
  yield all([
    yield takeEvery(RootActions.Types.API_ERROR, onApiError)
  ]);
}
