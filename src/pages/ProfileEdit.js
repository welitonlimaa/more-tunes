import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Carregando from './Carregando';
import { getUser, updateUser } from '../services/userAPI';
import backHeader from '../imgStyle/back-header.png';
import perfilphoto from '../imgStyle/perfilphoto.png';

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
    const { updateUserData } = this.props;
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
    updateUserData({ name, image });
  };

  handleChange = ({ target }) => {
    const { id, value } = target;
    this.setState({
      [id]: value,
    });
  };

  valideEmail = ({ target }) => {
    // referencia https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
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
    const { name, email, description, isLoadingUser, salvo, image } = this.state;
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
    let srcimg = '';
    if (image.length === 0) {
      srcimg = perfilphoto;
    } else {
      srcimg = image;
    }

    return (
      <div data-testid="page-profile-edit">
        { compHeader }
        <div className="container">
          <div className="container-content">
            <div id="header-content">
              <img src={ backHeader } alt="back-header" />
            </div>
          </div>
          <div id="perfil-container">
            <div id="perfil-image">
              <img
                src={ srcimg }
                alt="perfil"
                data-testid="profile-image"
              />
              <input
                data-testid="edit-input-image"
                id="image"
                placeholder="Insira um Link"
                value={ image }
                onChange={ this.handleChange }
              />
            </div>
            <form id="dados-container">
              <br />
              <p>Nome</p>
              <p className="p-auxiliar">Fique à vontade para usar seu nome social</p>
              <input
                data-testid="edit-input-name"
                id="name"
                placeholder="Nome"
                value={ name }
                onChange={ this.handleChange }
              />
              <br />
              <p>E-mail</p>
              <p className="p-auxiliar">Escolha um email que consulte diariamente</p>
              <input
                data-testid="edit-input-email"
                id="email"
                placeholder="usuario@dominio.com"
                value={ email }
                onChange={ this.valideEmail }
              />
              <br />
              <p>Descrição</p>
              <textarea
                data-testid="edit-input-description"
                id="description"
                placeholder="Sobre mim"
                value={ description }
                onChange={ this.handleChange }
              />
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
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  compHeader: PropTypes.element.isRequired,
  updateUserData: PropTypes.func.isRequired,
};

export default ProfileEdit;
