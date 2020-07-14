import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

// you can add more as you require
/**
 * as an alternative you caould use redux-dev tools which is 80x sexier
 */
const middlewares = [ logger ];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;