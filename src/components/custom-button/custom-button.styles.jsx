import styled, { css } from 'styled-components';

const getButtonStyles = props => {

  if (props.isGoogleSignIn) {
    return googleSignInStyle;

  } else if (props.inverted) {
    return invertedButtonStyle;

  }

};



// inverted button specifics only
const invertedButtonStyle = css`
  background-color: white;
  color: black;
  border: 1px solid black;
  &:hover {
    background-color: black;
    color: white;
    border:none;
  }
`;

// google sign in specific style
const googleSignInStyle = css`
  background: #4285f4;
  color:white;
  &:hover {
    background: #357ae8;
    color:white;
    border: none;
  }
`;

// Contains just the base styles
export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;
  color: white;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }

  ${getButtonStyles}


`;
