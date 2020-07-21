import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

// you can add more as you require
/**
 * as an alternative you caould use redux-dev tools which is 80x sexier
 */
const middlewares = [ thunk ];

if(process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
export const persistor = persistStore(store);

export default {store, persistor};