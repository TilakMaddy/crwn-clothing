import React from 'react';
import './checkout.styles.scss';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors';
import { connect } from 'react-redux';

const CheckoutPage = ({ cartItems, totalPrice }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block"><span>Product</span></div>
      <div className="header-block"><span>Description</span></div>
      <div className="header-block"><span>Quantity</span></div>
      <div className="header-block"><span>Price</span></div>
      <div className="header-block"><span>Remove</span></div>
    </div>

    <div className="total">
      <span>TOTAL : ${ totalPrice }</span>
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  totalPrice: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPage);