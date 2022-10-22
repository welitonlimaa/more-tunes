import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Carregando from './pages/Carregando';
import Header from './components/Header';
import Nav from './components/Nav';
import { getFavoriteSongs, removeSong } from './services/favoriteSongsAPI';

class Routes extends React.Component {
  constructor() {
    super();
    this.state = {
      loadingFav: false,
      loadingRemove: false,
      add: false,
      listaFav: [],
      updateDados: false,
      userDados: {},
    };
  }

  componentDidMount() {
    const { getDados } = this.props;
    getDados();
  }

  removeFav = async (id, album) => {
    if (album !== undefined) {
      const objFav = album.find((dado) => dado.trackId === id);
      this.setState(
        { loadingRemove: true },
        async () => {
          await removeSong(objFav);
          this.setState({
            loadingRemove: false,
          });
        },
      );
    }
  };

  atualizaFav = async (id, add, album) => {
    const { listaFav } = this.state;
    if (add === true) {
      await this.removeFav(id, album);
      const lista = listaFav.filter((dado) => dado !== id);
      this.setState({
        listaFav: lista,
      });
    } else {
      await this.removeFav(id);
      this.setState((prevVal) => ({
        listaFav: [...prevVal.listaFav, id],
      }));
    }
  };

  getFavs = async () => {
    this.setState(
      { loadingFav: true },
      async () => {
        const lista = await getFavoriteSongs();
        const listaIdfav = lista.map((dado) => dado.trackId);
        this.setState({
          loadingFav: false,
          listaFav: listaIdfav,
        });
      },
    );
  };

  updateUserData = ({ name, image }) => {
    const user = { name, image };
    this.setState({
      updateDados: true,
      userDados: user,
    });
  };

  render() {
    const { name, isDisabled, onInputChange, entrar, logado, clicou, user,
      loadingUser, getDados, artist, searchArtist, arrayArtist, nameArtista,
      loadingArtist, clicouSearch } = this.props;

    const { loadingFav, add, listaFav, loadingRemove, updateDados,
      userDados } = this.state;
    let dados = {};
    if (updateDados === false) {
      dados = user;
    } else {
      dados = userDados;
    }

    let compHeader = <Header user={ dados } />;
    if (loadingUser === true) {
      compHeader = <Carregando />;
    }

    let componente = (
      <Login
        name={ name }
        isDisabled={ isDisabled }
        onInputChange={ onInputChange }
        entrar={ entrar }
      />);
    if (clicou === true) {
      componente = <Carregando />;
    }
    console.log(user);

    return (
      <Switch>
        <Route exact path="/">
          {logado ? <Redirect to="/search" /> : componente }
        </Route>
        <Route path="/search">
          <Search
            getDados={ getDados }
            compHeader={ compHeader }
            artist={ artist }
            nameArtista={ nameArtista }
            onInputChange={ onInputChange }
            loadingArtist={ loadingArtist }
            isDisabled={ isDisabled }
            searchArtist={ searchArtist }
            arrayArtist={ arrayArtist }
            clicouSearch={ clicouSearch }
          />
        </Route>
        <Route
          path="/album/:id"
          render={ (props) => (
            <Album
              { ...props }
              compHeader={ compHeader }
              loadingFav={ loadingFav }
              loadingRemove={ loadingRemove }
              add={ add }
              listaFav={ listaFav }
              atualizaFav={ this.atualizaFav }
              getFavs={ this.getFavs }
            />
          ) }
        />
        <Route path="/favorites">
          <Favorites
            compHeader={ compHeader }
            getFavs={ this.getFavs }
            loadingFav={ loadingFav }
            loadingRemove={ loadingRemove }
            add={ add }
            listaFav={ listaFav }
            atualizaFav={ this.atualizaFav }
          />
        </Route>
        <Route
          path="/profile/edit"
          render={ (props) => (
            <ProfileEdit
              { ...props }
              compHeader={ compHeader }
              updateUserData={ this.updateUserData }
            />) }
        />
        <Route path="/profile">
          <Profile compHeader={ compHeader } />
        </Route>
        <Route path="/nav">
          <Nav user={ dados } />
        </Route>
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

Routes.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  nameArtista: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  logado: PropTypes.bool.isRequired,
  clicou: PropTypes.bool.isRequired,
  loadingUser: PropTypes.bool.isRequired,
  loadingArtist: PropTypes.bool.isRequired,
  clicouSearch: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  entrar: PropTypes.func.isRequired,
  getDados: PropTypes.func.isRequired,
  searchArtist: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  arrayArtist: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default Routes;
