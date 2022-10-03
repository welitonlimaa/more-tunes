import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <header data-testid="header-component">
        <p data-testid="header-user-name">{user.name}</p>
      </header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Header;
