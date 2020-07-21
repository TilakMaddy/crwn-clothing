import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
  payload: collectionsMap
})

export const fetchCollectionsFailure = message => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: message
})

export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    dispatch(fetchCollectionsStart());

    collectionRef.get().then(snapshot => {
      dispatch(fetchCollectionsSuccess(convertCollectionsSnapshotToMap(snapshot)));
    }).catch(err => dispatch(fetchCollectionsFailure(err.message)));
  }
}


