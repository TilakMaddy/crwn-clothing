import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss';

class SignUp extends React.Component {

  constructor() {
    super();

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async e => {

    e.preventDefault();

    const { displayName, password, email, confirmPassword } = this.state;

    if(password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try{

      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      console.log('user object: ' , user);
      await createUserProfileDocument(user, { displayName });
      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

    } catch(err) {
      console.error(err);
    }

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

export default SignUp;