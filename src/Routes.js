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

class Routes extends React.Component {
  componentDidMount() {
    const { getDados } = this.props;
    getDados();
  }

  render() {
    const { name, isDisabled, onInputChange, entrar, logado, clicou, user,
      loadingUser, getDados, artist } = this.props;
    let compHeader = <Header user={ user } />;
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
            onInputChange={ onInputChange }
            isDisabled={ isDisabled }
          />
        </Route>
        <Route
          path="/album/:id"
          render={ (props) => <Album { ...props } compHeader={ compHeader } /> }
        />
        <Route path="/favorites">
          <Favorites compHeader={ compHeader } />
        </Route>
        <Route
          path="/profile/edit"
          render={ (props) => <ProfileEdit { ...props } compHeader={ compHeader } /> }
        />
        <Route path="/profile">
          <Profile compHeader={ compHeader } />
        </Route>
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

Routes.propTypes = {
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  logado: PropTypes.bool.isRequired,
  clicou: PropTypes.bool.isRequired,
  loadingUser: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  entrar: PropTypes.func.isRequired,
  getDados: PropTypes.func.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Routes;
