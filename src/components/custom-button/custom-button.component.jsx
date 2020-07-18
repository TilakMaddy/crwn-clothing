import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, inverted, isGoogleSignIn, ...otherProps }) => (
  <button className=
    {
      `custom-button
      ${isGoogleSignIn ? 'google-sign-in' : ''}
      ${inverted ? 'inverted' : ''}`
    }
    {...otherProps}
  >
    { children }
  </button>
);

export default CustomButton;