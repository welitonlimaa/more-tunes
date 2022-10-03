import React from 'react';
import Routes from './Routes';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
      isLoading: true,
      logado: false,
      clicou: false,
    };
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  entrar = async () => {
    const { name } = this.state;
    if (name.length > 0) {
      this.setState(
        { clicou: true, isLoading: true },
        async () => {
          await createUser({ name });
          this.setState({
            isLoading: false,
            clicou: false,
          });
        },
      );
    }
  };

  render() {
    const { name, isLoading, clicou } = this.state;
    let { isDisabled, logado } = this.state;
    const limit = 3;
    if (name.length >= limit) {
      isDisabled = false;
    }

    if (isLoading === false) {
      logado = true;
    }

    return (
      <>
        <p>TrybeTunes</p>
        <Routes
          name={ name }
          isDisabled={ isDisabled }
          onInputChange={ this.onInputChange }
          entrar={ this.entrar }
          logado={ logado }
          clicou={ clicou }
        />
      </>
    );
  }
}

export default App;
