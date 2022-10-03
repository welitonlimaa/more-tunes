import React from 'react';
import PropTypes from 'prop-types';

class Search extends React.Component {
  render() {
    const { compHeader, artist, onInputChange } = this.props;
    let { isDisabled } = this.props;
    isDisabled = true;
    const limit = 2;
    if (artist.length >= limit) {
      isDisabled = false;
    }
    return (
      <div data-testid="page-search">
        { compHeader }
        <div>
          <form>
            <input
              data-testid="search-artist-input"
              name="artist"
              value={ artist }
              onChange={ onInputChange }
            />
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isDisabled }
            >
              Pesquisar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  compHeader: PropTypes.element.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  artist: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

export default Search;
