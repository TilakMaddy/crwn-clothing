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
  cartItems.filter(item => item.id !== itemToClear.id);

const removeItemFromCart = (cartItems, itemToRemove) =>
  cartItems
    .map(item => ({
      ...item,
      quantity: item.id === itemToRemove.id ? item.quantity - 1 : item.quantity
    }))
    .filter(item => item.quantity >= 1);

export { addItemToCart, clearItemFromCart, removeItemFromCart };