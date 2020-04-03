import { all, takeLatest, call, put } from 'redux-saga/effects';
import zendesk from 'bananasplit/services/zendesk';
import { navigateToOriginLink, navigateToUrl } from 'bananasplit/shared/url';
import { compose } from 'bananasplit/shared/saga-utils';

import NavbarActions from './actions';
import { withErrorHandling } from '../api-sagas';
import * as Services from '../../../shared/services';

// Inter-App Navigate To Link
export function* navigateToLink({ link }){
  yield call(navigateToOriginLink, link);
}

// Outwards Navigate To Link
export function* navigateToExternalLink({ link, openInNewWindow }){
  yield call(navigateToUrl, link, openInNewWindow);
}

// Open zenddesk support:
export function* openSupportBox(){
  try {
    zendesk.activate();
    yield put(NavbarActions.Creators.supportBoxOpened());
  } catch (error){
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

export function* unmaskUserImpl(){
  // Reload (Admin) User
  yield call(Services.unmaskUser);
  // Clear The Mask Data
  yield call(Services.cleanMaskedStorage);
  // Go To Accounts Page
  yield put(NavbarActions.Creators.navigateToLink('inbox/#accounts'));
}

export const unmaskUser = compose(
  withErrorHandling,
  unmaskUserImpl
);

export default function* navbarSagas(){
  yield all([
    takeLatest(NavbarActions.Types.NAVIGATE_TO_LINK, navigateToLink),
    takeLatest(NavbarActions.Types.NAVIGATE_TO_EXTERNAL_LINK, navigateToExternalLink),
    takeLatest(NavbarActions.Types.OPEN_SUPPORT_BOX, openSupportBox),
    takeLatest(NavbarActions.Types.UNMASK_USER, unmaskUser)
  ]);
}
