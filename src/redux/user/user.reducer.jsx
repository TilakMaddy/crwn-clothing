
const INITIAL_STATE = {
  currentUser: null,
};

/* even though it's userReducer every single action will be passed into it
so you will have to return the same object back if it has nothing to do with the
user. If you return a new object it will cause re-render which we dont want */

const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload,
      }
    default:
      return state;
  }
}