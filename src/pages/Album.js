import React from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: [],
      loadingFav: false,
      add: false,
      listaFav: [],
    };
  }

  componentDidMount() {
    this.getAlbum();
  }

  getAlbum = async () => {
    const { location: { pathname } } = this.props;
    const id = pathname.split('/album/');
    const idAlbum = id[1];
    const album = await getMusics(idAlbum);
    this.setState({ album });
  };

  insertFav = async (id) => {
    const { album } = this.state;
    const objFav = album.find((dado) => dado.trackId === id);
    this.setState((prevVal) => ({
      listaFav: [...prevVal.listaFav, id],
    }));
    this.setState(
      { loadingFav: true },
      async () => {
        await addSong(objFav);
        this.setState({
          loadingFav: false,
        });
      },
    );
  };

  render() {
    const { album, loadingFav, add, listaFav } = this.state;
    if (album.length === 0 || loadingFav === true) {
      return <Carregando />;
    }

    console.log(album);
    const { artistName, collectionName, artworkUrl100 } = album[0];
    const { compHeader } = this.props;

    return (
      <div data-testid="page-album">
        { compHeader }
        <div>
          <img src={ artworkUrl100 } alt={ collectionName } />
          <h3 data-testid="album-name">{collectionName}</h3>
          <h4 data-testid="artist-name">{artistName}</h4>
        </div>
        <div>
          {
            album.map((dado, index) => {
              const { trackId, trackName, previewUrl, artworkUrl60 } = dado;
              return index > 0
              && (
                <MusicCard
                  key={ index }
                  trackId={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  artworkUrl60={ artworkUrl60 }
                  insertFav={ this.insertFav }
                  add={ add }
                  listaFav={ listaFav }
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  compHeader: PropTypes.element.isRequired,
};

export default Album;
