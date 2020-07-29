import { takeLatest, put, call, all } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure } from './user.actions';

// helper generator function
function* signIn(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const snap = yield userRef.get();
    yield put(signInSuccess({
      id: snap.id,
      ...snap.data()
    }));
   } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield signIn(user);
   } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password}}) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield signIn(user);
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (userAuth) {
      yield signIn(userAuth);
    }
  } catch(error) {
    yield put(signInFailure(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession)
  ])
}