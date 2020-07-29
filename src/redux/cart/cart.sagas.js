import { all, call, put, takeLatest } from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

function* iclearCart() {
  yield put(clearCart())
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, iclearCart);
}

export function* cartSagas() {
  yield all([
    call(onSignOutSuccess),
  ]);
}