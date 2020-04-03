import { createSelector } from 'reselect';
import {
  featureLinksSelector as featureLinksSelectorImpl,
  accountLinksSelector as accountLinksSelectorImpl,
  userLinksSelector as userLinksSelectorImpl,
  availableProducts as availableProductsImpl,
  getAccountAvailableSelect as getAccountAvailableSelectImpl,
  getSupportAvailableSelect as getSupportAvailableSelectImpl
} from 'bananasplit/components/navbar/selectors';
import { getSession, getPermissions, getFeatures } from 'bananasplit/modules/session/selectors';
import cookie from 'js-cookie';

import { getBrowserAppVersion } from '../selectors';
import { getAuthenticatedUser } from '../../user/selectors';

const EMPTY_ARRAY = [];

const EMPTY_OBJECT = {};

export const isUserAuthenticated = createSelector(
  getSession,
  session => !!session.userId
);

export const getUserFullName = createSelector(
  getAuthenticatedUser,
  authenticatedUser => {
    return authenticatedUser ? `${authenticatedUser.firstName} ${authenticatedUser.lastName}` : '';
  }
);

export const isUserMasked = createSelector(
  () => !!cookie.get('masked_accesstoken')
);

export const navbarSelectorImpl =
  (user, fullName, authenticated, masked, browserAppVersion) => {
    // User Information Will Not Be Available If Not Authenticated
    if (!authenticated || (user && !user.userName)){
      return { loggedIn: false };
    }
    // User Is Authenticated.
    return {
      loggedIn: true,
      name: fullName,
      locale: user.locale,
      email: user.email,
      expirationTime: user.expirationTime,
      plan: user.package,
      version: browserAppVersion,
      masked
    };
  };

export const navbarSelector = createSelector(
  getAuthenticatedUser,
  getUserFullName,
  isUserAuthenticated,
  isUserMasked,
  getBrowserAppVersion,
  navbarSelectorImpl
);

export const getProducts = createSelector(
  getAuthenticatedUser,
  authenticatedUser => {
    return authenticatedUser ? authenticatedUser.products : EMPTY_OBJECT;
  }
);

export const availableProducts = createSelector(
  getProducts,
  availableProductsImpl
);

export const featureLinksSelector = createSelector(
  getPermissions,
  getProducts,
  featureLinksSelectorImpl
);

export const accountLinksSelector = createSelector(
  getPermissions,
  getFeatures,
  availableProducts,
  accountLinksSelectorImpl
);

export const userLinksSelector = createSelector(
  getPermissions,
  isUserMasked,
  userLinksSelectorImpl
);

export const getAccountAvailableSelect = createSelector(
  getPermissions,
  getAccountAvailableSelectImpl
);

export const getSupportAvailableSelect = createSelector(
  getPermissions,
  getSupportAvailableSelectImpl
);

export const teamsFeatureSelector = () => false;
// createSelector(
//   [getFeatures, getTeams],
//   teamsFeatureSelectorImpl
// );

export const getTeamsSelector = () => EMPTY_ARRAY;
// createSelector(
//   [getTeams],
//   getTeamsSelectorImpl
// );
export const getSelectedTeamSelector = () => null;
// createSelector(
//   [getSelectedTeam],
//   getSelectedTeamImpl
// );
