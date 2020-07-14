import React from 'react';

import { ReactComponent as ShoppingIcon } from '../../shopping-bag.svg';
import './cart-icon.styles.scss';

const CartIcon = () => (
  <div className="cart-icon">
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count"> 0 </span>
  </div>
);

export default CartIcon;


