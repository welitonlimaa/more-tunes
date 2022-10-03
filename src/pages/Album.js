import React from 'react';
import PropTypes from 'prop-types';

class Album extends React.Component {
  render() {
    const { compHeader } = this.props;
    return (
      <div data-testid="page-album">
        { compHeader }
      </div>
    );
  }
}

Album.propTypes = {
  compHeader: PropTypes.element.isRequired,
};

export default Album;
