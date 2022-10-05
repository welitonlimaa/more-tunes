import React from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { getUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      isLoadingUser: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState(
      { isLoadingUser: true },
      async () => {
        const resposta = await getUser();
        const { name, email, description, image } = resposta;
        this.setState({
          name,
          email,
          description,
          image,
          isLoadingUser: false,
        });
      },
    );
  };

  render() {
    const { compHeader } = this.props;
    const { name, email, description, image, isLoadingUser } = this.state;
    if (isLoadingUser === true) {
      return <Carregando />;
    }
    return (
      <div data-testid="page-profile-edit">
        { compHeader }
        <br />
        <div>
          <form>
            <input
              data-testid="edit-input-image"
            />
            <br />
            <br />
            <label htmlFor="name">
              Nome
              <input
                data-testid="edit-input-name"
                id="name"
              />
            </label>
            <br />
            <br />
            <label htmlFor="email">
              Email
              <input
                data-testid="edit-input-email"
                id="email"
              />
            </label>
            <br />
            <br />
            <label htmlFor="description">
              Descrição
              <textarea
                data-testid="edit-input-description"
                id="description"
              />
            </label>
            <br />
            <br />
            <button type="button" data-testid="edit-button-save">Salvar</button>
          </form>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  compHeader: PropTypes.element.isRequired,
};

export default ProfileEdit;
