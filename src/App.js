import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { action as setCurrentUserAction } from './redux/user/user.actions';

import './App.css';
import { selectCurrentUser } from './redux/user/user.selectors';

class App extends Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {

      console.log("auth state has changed to ", userAuth);

      const { setCurrentUser } = this.props;

      if (userAuth) {

        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snap => {

          setCurrentUser({
            id: snap.id, // document id is set to be same with user id
            ...snap.data()
          });

        });

      }
      setCurrentUser(userAuth);
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

const mapStateToProps = state => ({
  currentUser : selectCurrentUser(state)
});

/*
*dispatch(object) will pass the object to every reducer (redux does it)
*/

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUserAction(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
