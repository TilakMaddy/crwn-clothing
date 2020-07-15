import React from 'react';
import { withRouter } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';
import './cart-dropdown.styles.scss';
import { connect } from 'react-redux';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.actions';

/**dispatch function will be automatically passed as prop when
 * connect() doesnt receive second argument (i.e mapDispatchToProp)
*/
const CartDropdown = ({ items, dispatch, history }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {
        items.length ?
          items.map(item => <CartItem item={ item } key={ item.id }/>)
        :
          <span className="empty-message">Your cart is empty</span>
      }
    </div>
    <CustomButton onClick={ () => {
      history.push('/checkout');
      dispatch(toggleCartHidden())
      } }>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = state => ({
  items: selectCartItems(state)
});

export default withRouter(connect(mapStateToProps)(CartDropdown));

