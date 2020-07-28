import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { connect } from 'react-redux';
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  handleSubmit = async e => {

    e.preventDefault();
    const { emailSignInStart } = this.props;
    const { email, password } = this.state;

    emailSignInStart(email, password);

  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }


  render() {

    const { googleSignInStart } = this.props;

    return (
      <div className="sign-in">

        <h2>I already have an account</h2>
        <span>Sign in with and email and password</span>

        <form onSubmit={ this.handleSubmit }>

          <FormInput
            handleChange={ this.handleChange }
            value={ this.state.email }
            // requried
            name="email"
            type="email"
            label="email"
          />

          <FormInput
            handleChange={ this.handleChange }
            value={ this.state.password }
            // requried
            name="password"
            type="password"
            label="password"
          />

          <div className="buttons">
            <CustomButton type="submit"> Sign In  </CustomButton>

            {/* type=button tells the form to not treat it like a submit button */}
            <CustomButton type="button" isGoogleSignIn onClick={ googleSignInStart }> Sign In with Google</CustomButton>
          </div>

        </form>

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({ email, password }))
})

export default connect(null, mapDispatchToProps)(SignIn);