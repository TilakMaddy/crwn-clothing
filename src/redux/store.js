import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { fetchCollectionsStart } from './shop/shop.sagas';

const sagaMiddleare = createSagaMiddleware();

const middlewares = [ sagaMiddleare ];

if(process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleare.run(fetchCollectionsStart);

export const persistor = persistStore(store);

export default {store, persistor};