import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../imgStyle/logo.png';
import favoritas from '../imgStyle/star.png';
import pesquisa from '../imgStyle/lupa.png';
import perfilphoto from '../imgStyle/perfilphoto.png';

class Nav extends React.Component {
  render() {
    const { user } = this.props;
    const { name } = user;
    let { image } = user;
    if (image.length === 0) {
      image = perfilphoto;
    }

    return (
      <header data-testid="header-component">
        <div className="header-menu">
          <img src={ logo } alt="logo" id="logo-header" />
          <div id="nav">
            <Link to="/search" data-testid="link-to-search">
              <img src={ pesquisa } alt="pesquisa" />
              <p>Pesquisa</p>
            </Link>
            <Link to="/favorites" data-testid="link-to-favorites">
              <img src={ favoritas } alt="favoritas" />
              <p>Favoritas</p>
            </Link>
            <Link to="/profile" data-testid="link-to-profile">
              <img src={ perfilphoto } alt="perfil" />
              <p>Perfil</p>
            </Link>
          </div>
          <div id="user-header">
            <img src={ image } alt={ name } />
            <p data-testid="header-user-name">{user.name}</p>
          </div>
        </div>
      </header>
    );
  }
}

Nav.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Nav;
