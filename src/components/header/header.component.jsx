import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../crown.svg';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import './header.styles.scss';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';


const Header = ({ currentUser, hidden }) => (
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
          <div className="option" onClick={ () => auth.signOut() }>
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
const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
  hidden: state.cart.hidden
});

export default connect(mapStateToProps)(Header);
