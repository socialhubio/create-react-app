import { all, call, cancel, fork, put, select, take } from 'redux-saga/effects';
import { createRequestAnimationFrameChannel } from 'bananasplit/shared/saga-channels';
import { getNowDate, getLoadingBarEasingProgress } from 'bananasplit/shared/common-effects';

import RootActions from './actions';
import {
  isLoading as isLoadingSelector,
  getLoadingProgress as getLoadingProgressSelector,
  getAverageApiTime as getAverageApiTimeSelector
} from './api-selectors';

export const LOADING_BAR_EASING_TIME_MS = 150;

export function* startLoading(){
  const start = yield call(getNowDate);
  yield put(RootActions.Creators.apiHasStarted(start));
}

export function* finishLoading(){
  const end = yield call(getNowDate);
  yield put(RootActions.Creators.apiHasFinished(end));
}

export function* withErrorHandling(saga, ...args){
  try {
    return yield call(saga, ...args);
  } catch (ex){
    yield put(RootActions.Creators.apiError(ex.status, ex.code, ex.message, ex.data));
    console.error(ex);
  }
}

export function* withLoadingIndicator(saga, ...args){
  try {
    const start = yield call(getNowDate);
    yield put(RootActions.Creators.apiHasStarted(start));
    return yield call(saga, ...args);
  } finally {
    const end = yield call(getNowDate);
    yield put(RootActions.Creators.apiHasFinished(end));
  }
}

export function* loadingIndicatorAnimation(){
  const requestAnimationFrameChannel = yield call(createRequestAnimationFrameChannel);
  const averageApiTime = yield select(getAverageApiTimeSelector);

  let time = 0;

  // eslint-disable-next-line no-constant-condition
  while (true){
    const dt = yield take(requestAnimationFrameChannel);

    // Most important part is to get progress of the animation.
    // We'll delegate the responsibility to easing function
    // Important requirement on the easing function is that it
    // must limit the value to -> 1.
    const progress = yield call(getLoadingBarEasingProgress, time, averageApiTime);

    time += dt;
    yield put(RootActions.Creators.apiProgress(progress));
  }
}

export function* loadingIndicatorAnimationEaseOut(){
  const requestAnimationFrameChannel = yield call(createRequestAnimationFrameChannel);

  let progress = yield select(getLoadingProgressSelector);
  const missingProgress = 1 - progress;

  while (progress < 1){
    const dt = yield take(requestAnimationFrameChannel);
    progress += missingProgress * (dt / LOADING_BAR_EASING_TIME_MS);
    progress = Math.min(progress, 1); // Clamp value to 1
    yield put(RootActions.Creators.apiProgress(progress));
  }
}

export function* loadingIndicatorDaemon(){
  let loadingIndicatorAnimationTask = null;
  let loadingIndicatorAnimationEaseOutTask = null;

  // eslint-disable-next-line no-constant-condition
  while (true){
    yield take([
      RootActions.Types.API_HAS_STARTED,
      RootActions.Types.API_HAS_FINISHED
    ]);

    const isLoading = yield select(isLoadingSelector);

    // Is any API in progress and animation hasn't been started?
    if (isLoading && !loadingIndicatorAnimationTask){
      // When previous easing out animation is still in progress
      // we need to cancel it
      if (loadingIndicatorAnimationEaseOutTask){
        yield cancel(loadingIndicatorAnimationEaseOutTask);
      }

      // Just start the animation
      loadingIndicatorAnimationTask = yield fork(loadingIndicatorAnimation);
    } else if (!isLoading && loadingIndicatorAnimationTask){ // Is there no API in progress and running animation?
      // Just cancel the animation
      yield cancel(loadingIndicatorAnimationTask);
      loadingIndicatorAnimationTask = null;

      // and initiate the easing out animation (easing out animation)
      loadingIndicatorAnimationEaseOutTask = yield fork(loadingIndicatorAnimationEaseOut);
    }
  }
}

export default function* defaultSaga(){
  yield all([
    fork(loadingIndicatorDaemon)
  ]);
  // yield fork(bootstrapSaga);
  // TODO: Add API error handler
}
