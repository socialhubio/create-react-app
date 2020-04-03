import { createSelector } from 'reselect';

export const getState = state => state.api;

export const isLoadingImpl = state => state.requests > 0;

export const isLoading = createSelector(
  getState,
  isLoadingImpl
);

export const getLoadingProgress = createSelector(
  getState,
  state => state.progress
);

export const getAverageApiTime = createSelector(
  getState,
  state => state.averageApiTime
);
