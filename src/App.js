import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import './App.css';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { action } from './redux/user/user.actions';

class App extends Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snap => {

          this.props.setCurrentUser({
            id: snap.id, // document id is set to be same with user id
            ...snap.data()
          });

        });

      } else {
        this.props.setCurrentUser(userAuth); // which is null

      }
    });
  }

  componentDidUpdate() {
    console.log("app updated just now");
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={ HomePage }/>
          <Route path='/shop' component={ ShopPage } />
          <Route path='/signin' component={ SignInAndSignUp } />
        </Switch>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(
    action(user)
  )
});

export default connect(null, mapDispatchToProps)(App);
