import React from 'react';
import music from '../imgStyle/musica.gif';

class Carregando extends React.Component {
  render() {
    return (
      <div className="loading">
        <img src={ music } alt="music" />
      </div>
    );
  }
}

export default Carregando;
