import storage from 'redux-persist/lib/storage';
import { seamlessImmutableReconciler, seamlessImmutableTransformer } from 'redux-persist-seamless-immutable';
import createFilter from 'redux-persist-transform-filter-immutable';

const meetFilter = createFilter(
  'meet',
  ['view']
);

const transformerConfig = {
  whitelistPerReducer: {}
};

export default {
  key: 'meet',
  stateReconciler: seamlessImmutableReconciler,
  transforms: [
    seamlessImmutableTransformer(transformerConfig),
    meetFilter
  ],
  storage,
  whitelist: ['root', 'meet']
};
