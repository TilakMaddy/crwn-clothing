/**this took me quite a while to understand but now OK 👍 */

const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem =>
    cartItem.id === cartItemToAdd.id
  );
  if(existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [ ...cartItems, { ...cartItemToAdd, quantity: 1 } ];
};

const clearItemFromCart = (cartItems, itemToClear) =>
  cartItems.filter(item => item.id !== itemToClear.id)


export { addItemToCart, clearItemFromCart };