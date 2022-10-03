import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  render() {
    const { compHeader } = this.props;

    return (
      <div data-testid="page-search">
        { compHeader }
        header
      </div>
    );
  }
}

Search.propTypes = {
  compHeader: PropTypes.element.isRequired,
};

export default Search;
