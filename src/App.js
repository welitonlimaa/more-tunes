import React from 'react';
import Routes from './Routes';
import { createUser, getUser } from './services/userAPI';
import searchAlbumsAPI from './services/searchAlbumsAPI';
import './index.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isDisabled: true,
      isLoading: true,
      loadingUser: true,
      loadingArtist: false,
      logado: false,
      clicou: false,
      clicouSearch: false,
      user: {},
      artist: '',
      nameArtista: '',
      arrayArtist: [],
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

  searchArtist = async () => {
    const { artist } = this.state;
    this.setState(
      { loadingArtist: true },
      async () => {
        const resposta = await searchAlbumsAPI(artist);
        this.setState({
          clicouSearch: true,
          nameArtista: artist,
          artist: '',
          loadingArtist: false,
          arrayArtist: resposta,
        });
      },
    );
  };

  render() {
    const { name, isLoading, clicou, user, loadingUser, artist,
      arrayArtist, loadingArtist, clicouSearch, nameArtista } = this.state;
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
        isLoading={ isLoading }
        loadingUser={ loadingUser }
        getDados={ this.getDados }
        artist={ artist }
        arrayArtist={ arrayArtist }
        searchArtist={ this.searchArtist }
        loadingArtist={ loadingArtist }
        clicouSearch={ clicouSearch }
        nameArtista={ nameArtista }
      />
    );
  }
}

export default App;
