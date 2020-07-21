import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
})

export const fetchCollectionsFailure = message => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: message
})

/**
 * Owing to redux thunk we can no cause dispatch actions asynchronously
 * ❤️
 */
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef.get().then(snapshot => {
      const map = convertCollectionsSnapshotToMap(snapshot);
      console.log("mappy ", map);
      dispatch(fetchCollectionsSuccess(map));
    }).catch(err => dispatch(fetchCollectionsFailure(err.message)));
  }
}


