import { api, api2 } from './api';

import wrapApiCall from 'bananasplit/services/api/wrap-api-call';

//
// ---------------------------------- USER
//

/**
 * Gets details of logged in user
 *
 * @returns {Object} Logged in user details
 */
export const getUserDetails = wrapApiCall(() =>
  api2.get('/'));

/**
 * Fetches list of user summaries
 *
 * @returns {List} User summaries
 */
export const getUsers = wrapApiCall(() =>
  api.get('/users'));

/**
 * Unmask user
 */

export const unmaskUser = wrapApiCall(() =>
  api2.get('/users/logout'));

export const cleanMaskedStorage = () => {
  localStorage.removeItem('noStats');
};
