import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';

// this gives us access to localStorage
import storage from 'redux-persist/lib/storage';

// this gives us access to sessionStorage
import sessionStorage from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'root', // at what point of the reducer object do you want to start storing stuff

  storage: storage, // you could use sessionStorage if you wanted

  // array of strings of reducers that you want to persist
  whitelist: [
    'cart'
  ]

}

const rootReducer =  combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default persistReducer(persistConfig, rootReducer);
