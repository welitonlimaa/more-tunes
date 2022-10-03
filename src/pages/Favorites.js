import React from 'react';
import PropTypes from 'prop-types';

class Favorites extends React.Component {
  render() {
    const { compHeader } = this.props;
    return (
      <div data-testid="page-favorites">
        { compHeader }
      </div>
    );
  }
}

Favorites.propTypes = {
  compHeader: PropTypes.element.isRequired,
};

export default Favorites;
