import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { signUpStart } from '../../redux/user/user.actions';
import { connect } from 'react-redux';

import './sign-up.styles.scss';

class SignUp extends React.Component {

  state = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async e => {

    e.preventDefault();

    const { displayName, password, email, confirmPassword } = this.state;
    const { signUpStart } = this.props;

    if(password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    signUpStart({ displayName, email, password });

  }

  render() {
    const { displayName, password, email, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I don't have an account</h2>
        <span>Sign up with email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            value={ displayName }
            handleChange={ this.handleChange }
            label="Display Name"
          />
          <FormInput
            type="email"
            name="email"
            value={ email }
            handleChange={ this.handleChange }
            label="Email ID"
          />
          <FormInput
            type="password"
            name="password"
            value={ password }
            handleChange={ this.handleChange }
            label="Choose Password"
          />
          <FormInput
            type="password"
            name="confirmPassword"
            value={ confirmPassword }
            handleChange={ this.handleChange }
            label="Confirm Password"
          />
          <CustomButton type="submit"> SIGN UP </CustomButton>
        </form>
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  signUpStart: (credentials) => dispatch(signUpStart(credentials)),
})

export default connect(null, mapDispatchToProps)(SignUp);