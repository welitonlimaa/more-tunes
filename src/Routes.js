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

class Routes extends React.Component {
  render() {
    const { name, isDisabled, onInputChange, entrar, logado, clicou } = this.props;
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
          <Search />
        </Route>
        <Route
          path="/album/:id"
          render={ (props) => <Album { ...props } /> }
        />
        <Route path="/favorites">
          <Favorites />
        </Route>
        <Route
          path="/profile/edit"
          render={ (props) => <ProfileEdit { ...props } /> }
        />
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="*" component={ NotFound } />
      </Switch>
    );
  }
}

Routes.propTypes = {
  name: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  logado: PropTypes.bool.isRequired,
  clicou: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  entrar: PropTypes.func.isRequired,
};

export default Routes;
