import React from 'react';
import { connect } from 'react-redux';
import { authorize } from './actions';
import RegModal from './RegModal';

class AuthForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.authorizate = this.authorizate.bind(this);
    this.typing_login = this.typing_login.bind(this);
    this.typing_password = this.typing_password.bind(this);
  }

  authorizate(event) {
    event.preventDefault();
    const data = {
      login: this.state.login,
      pass: this.state.password,
    };

    this.props.dispatch(authorize(data));
    this.setState({ user: this.props.user });
  }

  typing_login(event) {
    this.setState({ login: event.target.value });
  }

  typing_password(event) {
    this.setState({ password: event.target.value });
  }


  render() {
    return (
      <div className="new border p-3 mt-3 rounded flex-fill">
        <form>
          <input type="text" className="form-control" placeholder="Логин" onChange={this.typing_login} />
          <input type="password" className="form-control mt-3" placeholder="Пароль" onChange={this.typing_password} />
          <div className="btn-group" role="group" aria-label="Basic example">
            <button type="submit" className="btn btn-primary mt-2" onClick={this.authorizate}>Авторизация</button>
            <button type="button" className="btn btn-success mt-2" data-toggle="modal" data-target="#RegModal">Регистрация</button>
          </div>
          {this.props.user
                        && <div className="alert alert-danger mt-2 ml-2 " role="alert">Неверный логин или пароль. Попробуй еще.</div>
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

export default connect(mapStateToProps)(AuthForm);
