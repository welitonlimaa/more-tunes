import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      description: '',
      image: '',
      isLoadingUser: false,
      statusEmail: false,
      salvo: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    const { salvo } = this.state;
    if (salvo === true) {
      <Redirect to="/profile" />;
    }
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

  updateData = async () => {
    const { name, email, description, image } = this.state;
    const objUser = { name, email, description, image };
    this.setState(
      { isLoadingUser: true },
      async () => {
        await updateUser(objUser);
        this.setState({
          isLoadingUser: false,
          salvo: true,
        });
      },
    );
  };

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  };

  valideEmail = ({ target }) => {
    const { value } = target;
    const re = /\S+@\S+\.\S+/;
    if (re.test(value) === true) {
      this.setState({
        email: value,
        statusEmail: true,
      });
    } else {
      this.setState({
        email: value,
        statusEmail: false,
      });
    }
  };

  render() {
    const { compHeader } = this.props;
    const { name, email, description, image, isLoadingUser, salvo } = this.state;
    let { statusEmail } = this.state;

    // const arrayUser = [name, email, description, image];
    // const statusArray = Array(0).fill(0);
    // for (let i = 0; i < arrayUser.length; i += 1) {
    //   if (arrayUser[i].length !== 0) {
    //     statusArray[i] = true;
    //   } else {
    //     statusArray[i] = false;
    //   }
    // }

    // const status = statusArray.some((dado) => dado === false);
    // if (status !== true && statusEmail === true) {
    //   isDisabled = false;
    // }

    if (isLoadingUser === true && salvo === false) {
      return <Carregando />;
    }
    if (salvo === true) {
      return <Redirect to="/profile" />;
    }
    const re = /\S+@\S+\.\S+/;
    if (re.test(email) === true) {
      statusEmail = true;
    }

    return (
      <div data-testid="page-profile-edit">
        { compHeader }
        <br />
        <div>
          <form>
            <input
              data-testid="edit-input-image"
              id="image"
              value={ image }
              onChange={ this.handleChange }
            />
            <br />
            <br />
            <label htmlFor="name">
              Nome
              <input
                data-testid="edit-input-name"
                id="name"
                value={ name }
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <br />
            <label htmlFor="email">
              Email
              <input
                data-testid="edit-input-email"
                id="email"
                value={ email }
                onChange={ this.valideEmail }
              />
            </label>
            <br />
            <br />
            <label htmlFor="description">
              Descrição
              <textarea
                data-testid="edit-input-description"
                id="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <br />
            <br />
            <button
              type="button"
              data-testid="edit-button-save"
              disabled={ !(name && email && description && image && statusEmail) }
              onClick={ this.updateData }
            >
              Salvar
            </button>
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
