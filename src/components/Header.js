import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../imgStyle/logo.png';
import perfil from '../imgStyle/perfil.png';
import favoritas from '../imgStyle/favoritas.png';
import pesquisa from '../imgStyle/pesquisa.png';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <header data-testid="header-component">
        <div className="header-menu">
          <img src={ logo } alt="logo" id="logo-header" />
          <div>
            <Link to="/search" data-testid="link-to-search">
              <img src={ pesquisa } alt="pesquisa" />
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <img src={ favoritas } alt="favoritas" />
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              <img src={ perfil } alt="perfil" />
            </Link>
          </div>
          <div id="user-header">
            <p data-testid="header-user-name">{user.name}</p>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Header;
