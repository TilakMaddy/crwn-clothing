import React from 'react';
import './sign-in.styles.scss';

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
          <input onChange={ this.handleChange } type="email" name="email" value={ this.state.email } required/>
          <label>Email</label>
          <input onChange={ this.handleChange } type="password" name="password" value={ this.state.password } required/>
          <label>Password</label>
          <input type="submit" value="Submit Form"/>
        </form>
      </div>
    );
  }
}

export default SignIn;