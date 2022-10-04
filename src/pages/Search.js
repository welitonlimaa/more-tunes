import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';

class Search extends React.Component {
  render() {
    const { compHeader, artist, onInputChange, searchArtist, arrayArtist,
      loadingArtist, clicouSearch, nameArtista } = this.props;

    let { isDisabled } = this.props;
    isDisabled = true;

    const limit = 2;
    if (artist.length >= limit) {
      isDisabled = false;
    }

    const componente = (
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
            onClick={ searchArtist }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );

    let tituloArtista = '';
    let albums = '';
    if (arrayArtist.length > 0 && clicouSearch === true) {
      tituloArtista = `Resultado de álbuns de: ${nameArtista}`;
      albums = arrayArtist.map((dado) => {
        const { artistName, collectionId, collectionName, artworkUrl100 } = dado;
        //  collectionPrice, releaseDate, trackCount, artistId,
        const albumLink = `/album/${collectionId}`;
        return (
          <div key={ collectionId }>
            <img src={ artworkUrl100 } alt={ collectionName } />
            <h3>
              <Link to={ albumLink } data-testid={ `link-to-album-${collectionId}` }>
                {collectionName}
              </Link>
            </h3>
            <p>{ artistName }</p>
          </div>
        );
      });
    } else if (arrayArtist.length === 0 && clicouSearch === true) {
      tituloArtista = 'Nenhum álbum foi encontrado';
    }

    return (
      <div data-testid="page-search">
        { compHeader }
        <div>
          { loadingArtist === true ? <Carregando /> : componente }
        </div>
        <div>
          <p>
            { tituloArtista }
          </p>
        </div>
        <div>
          { albums }
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  compHeader: PropTypes.element.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  artist: PropTypes.string.isRequired,
  nameArtista: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  loadingArtist: PropTypes.bool.isRequired,
  clicouSearch: PropTypes.bool.isRequired,
  searchArtist: PropTypes.func.isRequired,
  arrayArtist: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default Search;
