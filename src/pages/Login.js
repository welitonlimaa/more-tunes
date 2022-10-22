import React from 'react';
import PropTypes from 'prop-types';
import logo from '../imgStyle/logo.png';
import back from '../imgStyle/back.png';

class Login extends React.Component {
  render() {
    const { name, isDisabled, onInputChange, entrar } = this.props;
    return (
      <div data-testid="page-login" className="login">
        <img src={ back } alt="back" id="imgBack" />
        <form>
          <div id="logo-Form">
            <img src={ logo } alt="logo" />
            <div id="loginForm">
              <input
                data-testid="login-name-input"
                name="name"
                placeholder="Qual o seu nome?"
                value={ name }
                onChange={ onInputChange }
              />
              <br />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ isDisabled }
                onClick={ entrar }
              >
                Entrar
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  entrar: PropTypes.func.isRequired,
};

export default Login;
