import React from 'react';
import {toggleCartHidden} from '../../redux/cart/cart.actions';
import { ReactComponent as ShoppingIcon } from '../../shopping-bag.svg';
import './cart-icon.styles.scss';
import { connect } from 'react-redux';
import selectCartItemsCount from '../../redux/cart/cart.selectors';

const CartIcon = ({ toggleCartHidden, itemCount }) => (

  <div className="cart-icon" onClick={ toggleCartHidden }>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count"> { itemCount } </span>
  </div>

);

const mapDispatchToProps = dispatch => ({
  toggleCartHidden : () => dispatch(toggleCartHidden())
});

const mapStateToProps = state => ({
  itemCount : selectCartItemsCount(state)
});

/**
 * Here we want to display cart-items count
 *
 * So whenever the state object changes, even is it due to user reducer and
 * this component only cares about cart Items it will still make this
 * component re-render.
 *
 * All that true, if I use mapStateToProps normally like we have done all
 * the while but now with 'reselect' package you can block re-rendering
 * if it is useless (cart items haven't changed) - we dont care if user auth has changed
 *
 * To do that we make a cart.selectors.js in its redux folder
 */

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);


