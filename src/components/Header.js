import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import logo from '../imgStyle/logo.png';
import menuphone from '../imgStyle/menuphone.png';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    const navPhone = (
      <div className="header-phone">
        <Link to="/nav">
          <img src={ menuphone } alt="menu" id="menu-phone" />
        </Link>
        <img src={ logo } alt="logo" id="logo-header" />
      </div>
    );
    return (
      <div>
        {navPhone}
        <div className="header-big">
          <Nav user={ user } />
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Header;
