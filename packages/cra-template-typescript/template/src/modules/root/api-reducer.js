import Immutable from 'seamless-immutable';
import { createReducer } from 'reduxsauce';

import RootActions from './actions';

const INITIAL_STATE = Immutable({
  requests: 0,
  progress: null,
  averageApiTime: 200,
  time: []
});

const incrementRequestCounter = (state, { time }) => state
  .set('requests', state.requests + 1)
  .update('time', timeArray => timeArray.concat([time]));

const apiHasFinished = (state, { time }) => {
  const firstElement = state.time.length ? state.time[0] : 0;
  return state
    .set('requests', state.requests - 1)
    .set('averageApiTime', (state.averageApiTime + (time - firstElement)) / 2)
    .set('time', state.time.slice(1));
};

// Progress null is considered as component is hidden.
// Technically we might want to display the component
// even when requests are 0 because progress is not 1
// and therefore we need some easing out.
// Let's just make sure that when progress bar is 100%
// we always ensure to hide the component, that's
// why we use null in progress field.
const changeProgress = (state, { progress }) => state
  .set('progress', progress >= 1 ? null : progress);

export const HANDLERS = {
  [RootActions.Types.API_HAS_STARTED]: incrementRequestCounter,
  [RootActions.Types.API_HAS_FINISHED]: apiHasFinished,
  [RootActions.Types.API_PROGRESS]: changeProgress
};

export default createReducer(INITIAL_STATE, HANDLERS);
