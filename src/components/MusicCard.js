import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackId, trackName, previewUrl, callInsertFav, listaFav } = this.props;
    let { add } = this.props;
    // artworkUrl60
    const statusChecked = listaFav.some((dado) => dado === trackId);
    if (statusChecked === true) {
      add = true;
    } else {
      add = false;
    }
    console.log(add);
    return (
      <div>
        {/* <img src={ artworkUrl60 } alt={ trackName } /> */}
        <h4>{trackName}</h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="fav">
          <input
            data-testid={ `checkbox-music-${trackId}` }
            id="fav"
            type="checkbox"
            checked={ add }
            onChange={ () => callInsertFav(trackId, add) }
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  callInsertFav: PropTypes.func.isRequired,
  add: PropTypes.bool.isRequired,
  listaFav: PropTypes.arrayOf(PropTypes.number).isRequired,
//   artworkUrl60: PropTypes.string.isRequired,
};

export default MusicCard;
