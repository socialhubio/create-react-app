import * as r from 'ramda';
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
// import debugSettings from 'bananasplit/redux/config/debug-settings';
// import { routerMiddleware } from 'connected-react-router'

import reducers from '../reducers';
import sagas from '../sagas';
import persistConfig from '../persist/reducer-config';
import history from '../../router/history';

export const LOGGING_BLACKLIST = [
  'API_HAS_FINISHED',
  'API_HAS_STARTED',
  'API_PROGRESS',
  'TIME_AGO_TICK'
];

export const loggerPredicate = (getState, { type }) => {
  return r.not(r.contains(type, LOGGING_BLACKLIST));
};

const workingReducers = reducers(history);

export default () => {
  const middleware = [];

  // Routing Middleware - Dispatching Navigation Actions
  middleware.push(routerMiddleware(history));

  // Saga Middleware
  const sagaMiddleware = createSagaMiddleware();
  middleware.push(sagaMiddleware);

  // Logger Middleware
  // if (debugSettings.reduxLogging){
    middleware.push(createLogger({
      predicate: loggerPredicate
    }));
  // }

  const persistedReducers = persistReducer(persistConfig, workingReducers);
  const store = createStore(
      persistedReducers,
      compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__
            ? window.__REDUX_DEVTOOLS_EXTENSION__({
              actionsBlacklist: LOGGING_BLACKLIST
            })
            : () => {}
      )
  );

  // Persist The Store
  persistStore(store);

  // Run The Saga Daemons (From Root)
  sagaMiddleware.run(sagas);

  return store;
};
