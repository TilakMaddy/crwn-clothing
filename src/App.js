import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { connect } from 'react-redux';
import './App.css';
import { selectCurrentUser } from './redux/user/user.selectors';
import CheckoutPage from './pages/checkout/checkout.component';
import { checkUserSession } from './redux/user/user.actions';
import { createStructuredSelector } from 'reselect';

class App extends Component {

  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={ HomePage }/>
          <Route path='/shop' component={ ShopPage } />
          <Route path='/checkout' component={ CheckoutPage } />

          {/* render attribute equals a function which returns a component*/}
          <Route
            exact
            path='/signin'
            render={
              () => this.props.currentUser ?
                (<Redirect to='/' />)
              :
                (<SignInAndSignUp />)
            }
          />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = createStructuredSelector({
  currentUser : selectCurrentUser,
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


