import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Carregando from './Carregando';
import backHeader from '../imgStyle/back-header.png';
import notFoundX from '../imgStyle/notFound.png';

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
    const inputForm = (
      <input
        data-testid="search-artist-input"
        placeholder="Nome do Artista ou Banda"
        name="artist"
        value={ artist }
        onChange={ onInputChange }
      />
    );

    const buttonPesquisar = (
      <button
        type="button"
        data-testid="search-artist-button"
        disabled={ isDisabled }
        onClick={ searchArtist }
      >
        Pesquisar
      </button>
    );
    const componente = (
      <form>
        {inputForm}
        {buttonPesquisar}
      </form>
    );

    let tituloNotfound = '';
    let tituloArtista = '';
    let albums = '';
    if (arrayArtist.length > 0 && clicouSearch === true) {
      tituloArtista = (
        <h3 id="titulo-artista">
          {`Resultado de álbuns de: ${nameArtista}`}
        </h3>
      );
      albums = arrayArtist.map((dado, id) => {
        const { artistName, collectionId, collectionName, artworkUrl100 } = dado;
        //  collectionPrice, releaseDate, trackCount, artistId,
        const albumLink = `/album/${collectionId}`;
        return (
          <div key={ id } className="album-card">
            <img src={ artworkUrl100 } alt={ collectionName } />
            <div>
              <h3>
                <Link to={ albumLink } data-testid={ `link-to-album-${collectionId}` }>
                  {collectionName}
                </Link>
              </h3>
              <h4>{ artistName }</h4>
            </div>
          </div>
        );
      });
    } else if (arrayArtist.length === 0 && clicouSearch === true) {
      tituloNotfound = (
        <div id="not-found-artista">
          <img src={ notFoundX } alt="not found" />
          <p>Nenhum álbum foi encontrado</p>
        </div>);
    }

    return (
      <div data-testid="page-search" className="main-container">
        { compHeader }
        <div className="container">
          <div className="container-content">
            <div id="header-content">
              <img src={ backHeader } alt="back-header" />
              { componente }
            </div>
          </div>
          { arrayArtist.length === 0 ? tituloNotfound : tituloArtista }
          { loadingArtist === true ? <Carregando />
            : <div className="container-albums">{ albums }</div> }

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
