import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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
    const { compHeader } = this.props;
    const { name, email, description, image, loadingUser } = this.state;
    if (loadingUser === true) {
      return <Carregando />;
    }
    return (
      <div data-testid="page-profile">
        { compHeader }
        <div className="container">
          <div className="container-content">
            <div>
              <Link to="/profile/edit">Editar perfil</Link>
              <br />
              <br />
              <img src={ image } alt="perfil" data-testid="profile-image" />
              <h3>{name}</h3>
              <p>{email}</p>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  compHeader: PropTypes.element.isRequired,
};

export default Profile;
