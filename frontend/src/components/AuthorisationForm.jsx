import React from 'react';
import { connect } from 'react-redux';
import { authorize } from '../redux/actions';
import RegModal from './RegModal';
import PropTypes from 'prop-types';

class AuthForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.authorizate = this.authorizate.bind(this);
    this.typinglogin = this.typinglogin.bind(this);
    this.typingpassword = this.typingpassword.bind(this);
  }

  authorizate(event) {
    event.preventDefault();
    const { login, pass } = this.state;
    const data = {
      login,
      pass,
    };
    const { authorize } = this.props;


    authorize(data);
  }

  typinglogin(event) {
    this.setState({ login: event.target.value });
  }

  typingpassword(event) {
    this.setState({ pass: event.target.value });
  }


  render() {
    const { user } = this.props;


    return (
      <div className="new border p-3 mt-3 rounded flex-fill">
        <form>
          <input type="text" className="form-control" placeholder="Логин" onChange={this.typinglogin} />
          <input type="password" className="form-control mt-3" placeholder="Пароль" onChange={this.typingpassword} />
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="submit" className="btn btn-primary mt-2" onClick={this.authorizate}>Авторизация</button>
            <button
              type="button"
              className="btn btn-success mt-2"
              data-toggle="modal"
              data-target="#RegModal"
            >
              Регистрация
            </button>
          </div>
          {user && <div className="alert alert-danger mt-2 ml-2" role="alert">Неверный логин/пароль. Попробуй еще.</div>


          }
        </form>
        <RegModal />
      </div>

    );
  }

}

const mapStateToProps = function(state) {
  return { user: state.user };
};

const mapDispatchToProps = function(dispatch) {
  return { authorize: data => dispatch(authorize(data)) };
};

AuthForm.propTypes = { user: PropTypes.objectOf.isRequired };

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
