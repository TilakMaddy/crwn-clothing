import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
)

export const selectCartItems = createSelector(
  [selectCart],     // collection of input selectors
  cart => cart.cartItems
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce((acc, item) => (
      acc + item.price * item.quantity
    ), 0)
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce((acc, item) => (
      acc + item.quantity
    ), 0)
);

export default selectCartItemsCount;