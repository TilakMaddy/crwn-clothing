import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ email: '', password: ''});
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="sign-in">

        <h2>I already have an account</h2>
        <span>Sign in with and email and password</span>

        <form onSubmit={ this.handleSubmit }>
          <FormInput
            handleChange={ this.handleChange }
            value={ this.state.email }
            requried
            name="email"
            type="email"
            label="email"
          />

          <FormInput
            handleChange={ this.handleChange }
            value={ this.state.password }
            requried
            name="password"
            type="password"
            label="password"
          />
          <input type="submit" value="Submit Form"/>
        </form>

      </div>
    );
  }
}

export default SignIn;