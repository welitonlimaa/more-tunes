import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { name, isDisabled, onInputChange, entrar } = this.props;
    return (
      <div data-testid="page-login">
        <form>
          <input
            data-testid="login-name-input"
            name="name"
            placeholder="Digite o nome..."
            value={ name }
            onChange={ onInputChange }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isDisabled }
            onClick={ entrar }
          >
            Entrar
          </button>
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
