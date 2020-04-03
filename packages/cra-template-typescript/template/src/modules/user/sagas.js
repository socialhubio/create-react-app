import { put, call, all, takeEvery } from 'redux-saga/effects';
import { pathOr } from 'ramda';
import { compose } from 'bananasplit/shared/saga-utils';
import { ACCESS_DENIED_403 } from 'bananasplit/constants/routes';
import { PermissionTypes } from 'bananasplit/constants/permissions';

import * as Services from '../../shared/services';
import Actions from './actions';
import RootActions from '../root/actions';
import { push } from '../../router/effects';
import { withLoadingIndicator, withErrorHandling } from '../root/api-sagas';

export function* fetchUsersImpl(){
  const users = yield call(Services.getUsers);
  yield put(Actions.Creators.usersFetched(users.data));
}

export const fetchUsers = compose(
  withLoadingIndicator,
  withErrorHandling,
  fetchUsersImpl
);

export function* fetchUserDetailsImpl(){
  const user = yield call(Services.getUserDetails);
  yield put(RootActions.Creators.setSession(user));
  const mlActive = pathOr(false, ['products', 'ml', 'active'], user);
  const canUseMediaLibrary = pathOr([], ['permissions'], user)
    .includes(PermissionTypes.UseMediaLibrary);

  // If ML is not activated or user has no permissons - redirect to ML 403 page
  if (!mlActive || !canUseMediaLibrary){
    yield call(push, ACCESS_DENIED_403);
  }

}

export const fetchUserDetails = compose(
  withLoadingIndicator,
  withErrorHandling,
  fetchUserDetailsImpl
);

export default function* userSagas(){
  yield all([
    takeEvery(Actions.Types.FETCH_USERS, fetchUsersImpl)
  ]);
}
