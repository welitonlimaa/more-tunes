import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';
import backHeader from '../imgStyle/back-header.png';
import '../styleFav.css';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      isloadingFav: false,
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum = async () => {
    const { location: { pathname } } = this.props;
    const { getFavs } = this.props;
    const id = pathname.split('/album/');
    const idAlbum = id[1];
    const album = await getMusics(idAlbum);
    this.setState({ album });
    getFavs();
  };

  insertFav = async (id, add) => {
    const { album } = this.state;
    const { atualizaFav } = this.props;
    const objFav = album.find((dado) => dado.trackId === id);
    atualizaFav(id, add, album);
    if (add === false) {
      this.setState(
        { isloadingFav: true },
        async () => {
          await addSong(objFav);
          this.setState({
            isloadingFav: false,
          });
        },
      );
    }
  };

  render() {
    const { album, isloadingFav } = this.state;
    const { add, listaFav, loadingRemove } = this.props;
    const { compHeader } = this.props;
    let componente = '';
    if (album.length === 0 || isloadingFav === true || loadingRemove === true) {
      componente = <Carregando />;
    } else {
      const { artistName, collectionName, artworkUrl100 } = album[0];
      const albumtitle = (
        <div id="album-title">
          <h3 data-testid="album-name">{collectionName}</h3>
          <h5 data-testid="artist-name">{artistName}</h5>
        </div>
      );
      componente = (
        <div id="album-id">
          <div id="album-image">
            <img src={ artworkUrl100 } alt={ collectionName } />
          </div>
          <div id="album-container">
            {albumtitle}
            <div id="album-musics">
              { album.map((dado, index) => {
                const { trackId, trackName, previewUrl, artworkUrl60 } = dado;
                return index > 0
              && (
                <MusicCard
                  key={ index }
                  trackId={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  artworkUrl60={ artworkUrl60 }
                  callInsertFav={ this.insertFav }
                  add={ add }
                  listaFav={ listaFav }
                />
              );
              })}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div data-testid="page-album">
        { compHeader }
        <div className="container">
          <div className="container-content">
            <div id="header-content">
              <img src={ backHeader } alt="back-header" />
            </div>
          </div>
          { componente }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  loadingRemove: PropTypes.bool.isRequired,
  add: PropTypes.bool.isRequired,
  listaFav: PropTypes.arrayOf(PropTypes.number).isRequired,
  compHeader: PropTypes.element.isRequired,
  getFavs: PropTypes.func.isRequired,
  atualizaFav: PropTypes.func.isRequired,
};

export default Album;
