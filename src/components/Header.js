import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{user.name}</p>
        <div>
          <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Header;
