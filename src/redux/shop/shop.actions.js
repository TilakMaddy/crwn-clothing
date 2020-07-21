import ShopActionTypes from './shop.types';

export const updateCollection = collectionsMap => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionsMap
});

