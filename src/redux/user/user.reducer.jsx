import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null
};

/* even though it's userReducer every single action will be passed into it
so you will have to return the same object back if it has nothing to do with the
user. If you return a new object it will cause re-render which we dont want */

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null, // Clear the error if signed in successfully
      }

    case UserActionTypes.SIGN_OUT_SUCCESS:
        return {
          ...state,
          currentUser: null,
          error: null
        }

    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state;
  }
}

export default userReducer;