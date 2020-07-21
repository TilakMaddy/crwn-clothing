import { createSelector } from "reselect";

const selectShop = state => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// returns the object as an ARRAY
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => collections ? Object.keys(collections).map(key => collections[key]) : []
);

// this function isn't memoized
export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections ? collections[collectionUrlParam] : null
  );

//* Not having the above function memoized will probably N o t  affect the app coz its O(1) access anyways

export const selectCollectionIsFetching = createSelector(
  [selectShop],
  shop => shop.isFetching
);
