import { takeLatest, put, call, all } from 'redux-saga/effects';
import { UserActionTypes } from './user.types';
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpFailure, signUpSuccess } from './user.actions';

// helper generator function
function* signIn(userAuth, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
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

function* signOut() {
  try {
    auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error))
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* signUp({ payload: { email, password, displayName }}) {
  try{

    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName }}))

  } catch(err) {
    yield put(signUpFailure(err))
  }
}

function* signInAfterSignUp({ payload: { user, additionalData }}) {
  yield call(signIn, user, additionalData);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
  ])
}