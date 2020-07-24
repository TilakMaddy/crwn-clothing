import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './root-saga';

const sagaMiddleare = createSagaMiddleware();

const middlewares = [ sagaMiddleare ];

if(process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleare.run(rootSaga);

export const persistor = persistStore(store);

export default {store, persistor};