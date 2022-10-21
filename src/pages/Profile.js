import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import backHeader from '../imgStyle/back-header.png';
import perfilphoto from '../imgStyle/perfilphoto.png';
import Header from '../components/Header';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      loadingUser: true,
    };
  }

  componentDidMount() {
    this.getProfileDate();
  }

  getProfileDate = async () => {
    this.setState(
      { loadingUser: true },
      async () => {
        const resposta = await getUser();
        const { name, email, description, image } = resposta;
        this.setState({
          name,
          email,
          description,
          image,
          loadingUser: false,
        });
      },
    );
  };

  render() {
    // const { compHeader } = this.props;
    const { name, email, description, loadingUser } = this.state;

    let { image } = this.state;
    if (image.length === 0) {
      image = perfilphoto;
    }
    const user = { name, image };

    const buttonEditar = (
      <button type="button">
        Editar Perfil
      </button>
    );

    return (
      <div data-testid="page-profile">
        <Header user={ user } />
        { loadingUser === true ? <Carregando />
          : (
            <div className="container">
              <div className="container-content-perfil">
                <div className="header-content-perfil">
                  <img src={ backHeader } alt="back-header" />
                </div>
              </div>
              <div id="perfil-container">
                <div id="perfil-image">
                  <img
                    src={ image }
                    alt="perfil"
                    data-testid="profile-image"
                  />
                </div>
                <div id="dados-container">
                  <div>
                    <h3>Nome</h3>
                    <p>{name}</p>
                    <h3>E-mail</h3>
                    <p>{email}</p>
                    <h3>Descrição</h3>
                    <p>{description}</p>
                    <Link to="/profile/edit">
                      {buttonEditar}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    );
  }
}

// Profile.propTypes = {
//   compHeader: PropTypes.element.isRequired,
// };

export default Profile;
