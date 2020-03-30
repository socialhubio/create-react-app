import storage from 'redux-persist/lib/storage';
import { seamlessImmutableReconciler, seamlessImmutableTransformer } from 'redux-persist-seamless-immutable';
import createFilter from 'redux-persist-transform-filter-immutable';

const calendarViewFilter = createFilter(
  'calendar',
  ['view']
);

const transformerConfig = {
  whitelistPerReducer: {}
};

export default {
  key: 'app',
  stateReconciler: seamlessImmutableReconciler,
  transforms: [
    seamlessImmutableTransformer(transformerConfig)
  ],
  storage,
  whitelist: ['root', 'calendar']
};
