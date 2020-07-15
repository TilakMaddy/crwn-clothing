import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';

const CartDropdown = ({ items }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {
        items.map(item => (<CartItem item={ item } key={ item.id }/>))
      }
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = state => ({
  items: state.cart.cartItems
});

export default connect(mapStateToProps)(CartDropdown);

