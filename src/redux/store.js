import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

// you can add more as you require
const middlewares = [ logger ];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;