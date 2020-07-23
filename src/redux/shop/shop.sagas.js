// takeEvery listens to every action of a specific type that we pass to it
// and fires the generator asynchronously in a way that it doesn't block
// the other going on parts of code from executing

// yield function inside the generator give back the control to the middleaware
// will make more sense as you write the code

import { takeEvery, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

// this is invoked by below function as a 2nd argument to takeEvery
export function* fetchCollectionsAsync() {

  try {

    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get(); // yield acts like await inside generator functions, it resolves the promise

    // If you call directly the execution wont be stoppable by redux saga
    // in case it takes too much time and this fetchCollectionsAsync() has to be
    // called again. Hence  use call(fn, args)
    // const map = convertCollectionsSnapshotToMap(snapshot); --> TECHNICALLY OK, BUT SUCKS

    const map = yield call(convertCollectionsSnapshotToMap, snapshot);

    // there is no 'dispatch' argument we receive in order to dispatch functions
    // rather what we do is use 'yield put()' which is the saga equivalent

    yield put(fetchCollectionsSuccess(map));

  } catch(err) {

    yield put(fetchCollectionsFailure(err.message));

  }

}

// this function is invoked in store.js using sagaMiddleware.run(..)
export function* fetchCollectionsStart() {
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START, // wait for this action
    fetchCollectionsAsync  // and fire this generator defined above
  );
}

