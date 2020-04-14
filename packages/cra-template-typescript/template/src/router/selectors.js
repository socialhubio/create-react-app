import { createSelector } from 'reselect';

import { getRouter as getState } from 'modules/root/root-selectors';

const EMPTY_OBJECT = {};

const getLocation = createSelector(
  getState,
  state => state.location || EMPTY_OBJECT
);

export const getPathname = createSelector(
  getLocation,
  state => state.pathname
);

export const getURLQuery = createSelector(
  getLocation,
  state => state.search
);
