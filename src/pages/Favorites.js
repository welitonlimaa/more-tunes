import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
    };
  }

  componentDidMount() {
    this.getMusics();
  }

  componentDidUpdate(prevProps) {
    const { listaFav } = this.props;
    if (prevProps.listaFav.length !== listaFav.length) {
      this.getMusics();
    }
  }

  getMusics = async () => {
    const { getFavs } = this.props;
    const musicas = await getFavoriteSongs();
    this.setState({ musicas });
    getFavs();
  };

  callUpdate = (id, add) => {
    const { musicas } = this.state;
    this.getMusics();
    const { atualizaFav } = this.props;
    atualizaFav(id, add, musicas);
  };

  render() {
    const { musicas } = this.state;

    const { loadingRemove, add, listaFav, loadingFav } = this.props;
    if (musicas === undefined || loadingRemove === true || loadingFav === true) {
      return <Carregando />;
    }
    const { compHeader } = this.props;
    return (
      <div data-testid="page-favorites">
        { compHeader }
        <div className="container">
          {
            musicas.map((dado, index) => {
              const { trackId, trackName, previewUrl, artworkUrl60 } = dado;
              return (
                <MusicCard
                  key={ index }
                  trackId={ trackId }
                  trackName={ trackName }
                  previewUrl={ previewUrl }
                  artworkUrl60={ artworkUrl60 }
                  musicas={ musicas }
                  callInsertFav={ this.callUpdate }
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

Favorites.propTypes = {
  compHeader: PropTypes.element.isRequired,
  getFavs: PropTypes.func.isRequired,
  loadingRemove: PropTypes.bool.isRequired,
  loadingFav: PropTypes.bool.isRequired,
  add: PropTypes.bool.isRequired,
  listaFav: PropTypes.arrayOf(PropTypes.number).isRequired,
  atualizaFav: PropTypes.func.isRequired,
};

export default Favorites;
