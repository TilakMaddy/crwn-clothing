/**this took me quite a while to understand but now OK 👍 */

const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem =>
    cartItem.id === cartItemToAdd.id
  );
  if(existingCartItem) {
    return cartItems.map(cartItem =>
      cartItem.id === cartItemToAdd.id
        ? { ...cartItems, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  return [ ...cartItems, { ...cartItemToAdd, quantity: 1 } ];
};

export { addItemToCart };