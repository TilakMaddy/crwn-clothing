import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

const Header = ({ currentUser, hidden, signOutStart }) => (
  <div className="header">
    <Link to="/" className="logo-container">
      <Logo className="logo"/>
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {
        currentUser ?
          <div className="option" onClick={ signOutStart }>
            SIGN OUT
          </div>
        :
        <Link className="option" to="/signin"> SIGN IN </Link>

      }
      <CartIcon />
    </div>
    { !hidden && <CartDropdown />}
  </div>
);

/*
they keys of the object returned will be passed in as props to
the header component

param state: top level root reducer
*/

//? THIS WAY IS REGULAR STYLE (repeated typing)
// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state)
// });

// SWAG WAY - less repition
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
