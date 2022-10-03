import React from 'react';
import Routes from './Routes';
import { createUser, getUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
      isLoading: true,
      loadingUser: true,
      logado: false,
      clicou: false,
      user: {},
      artist: '',
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

  getDados = async () => {
    this.setState(
      { loadingUser: true },
      async () => {
        const resposta = await getUser();
        this.setState({
          user: resposta,
          loadingUser: false,
        });
      },
    );
  };

  render() {
    const { name, isLoading, clicou, user, loadingUser, artist } = this.state;
    let { isDisabled, logado } = this.state;
    const limit = 3;

    if (name.length >= limit) {
      isDisabled = false;
    }

    if (isLoading === false) {
      logado = true;
    }

    return (
      <Routes
        name={ name }
        isDisabled={ isDisabled }
        onInputChange={ this.onInputChange }
        entrar={ this.entrar }
        logado={ logado }
        clicou={ clicou }
        user={ user }
        loadingUser={ loadingUser }
        getDados={ this.getDados }
        artist={ artist }
      />
    );
  }
}

export default App;
