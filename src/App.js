import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import './App.css';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser : null
    };
  }

  unsubscribeFromAuth = null

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log("auth state changed", userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snap => {
          console.log("on snapshotted", snap);
          this.setState({
            currentUser:  {
              id: snap.id, // document id is set to be same with user id
              ...snap.data()
            }
          }, () => console.log(this.state));
        });
      } else {
        this.setState({ currentUser: null });
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
        <Header currentUser={ this.state.currentUser } />
        <Switch>
          <Route exact path='/' component={ HomePage }/>
          <Route path='/shop' component={ ShopPage } />
          <Route path='/signin' component={ SignInAndSignUp } />
        </Switch>
      </div>
    );
  }

}


export default App;
