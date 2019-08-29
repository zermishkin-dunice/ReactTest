import React from 'react';
import { connect } from 'react-redux';
import { registrateaction } from '../redux/actions';
import PropTypes from 'prop-types';

class RegModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      correct: true,
      email: '',
      firstname: '',
      lastname: '',
      password: '',
      username: '',
    };
    this.typinglogin = this.typinglogin.bind(this);
    this.typingpassword = this.typingpassword.bind(this);
    this.typingfirstname = this.typingfirstname.bind(this);
    this.typinglastname = this.typinglastname.bind(this);
    this.typingemail = this.typingemail.bind(this);
    this.registrate = this.registrate.bind(this);
  }

  typinglogin(event) {
    this.setState({ username: event.target.value });
  }

  typingpassword(event) {
    this.setState({ password: event.target.value });
  }

  typingfirstname(event) {
    this.setState({ firstname: event.target.value });
  }

  typinglastname(event) {
    this.setState({ lastname: event.target.value });
  }

  typingemail(event) {
    this.setState({ email: event.target.value });
  }

  registrate(event) {
    event.preventDefault();
    const { username, password, firstname, lastname, email } = this.state;
    const data = {
      email,
      firstname,
      lastname,
      password,
      username,
    };

    if (username && password && firstname && lastname && email) {
      this.setState({ correct: true });
      const {registrateaction: registrate} = this.props;
      registrate(data);
      this.setState({
        email: '',
        firstname: '',
        lastname: '',
        password: '',
        username: '',
      });
    } else {
      this.setState({ correct: false });
    }
  }


  render() {
    const { correct } = this.state;
    const { result } = this.props;

    return (
      <div
        className="modal fade"
        id="RegModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Регистрация нового автора</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Логин"
                  onChange={this.typinglogin}
                />
                <input
                  type="password"
                  className="form-control mt-3"
                  placeholder="Пароль"
                  onChange={this.typingpassword}
                />
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Имя"
                  onChange={this.typingfirstname}
                />
                <input
                  type="text"
                  className="form-control mt-3"
                  placeholder="Фамилия"
                  onChange={this.typinglastname}
                />
                <input
                  type="e-mail"
                  className="form-control mt-3"
                  placeholder="E-Mail"
                  onChange={this.typingemail}
                />
                <button
                  type="button"
                  className="btn btn-secondary mt-3"
                  data-dismiss="modal"
                >
                  Закрыть
                </button>
                <button
                  type="button"
                  className="btn btn-primary mt-3 ml-2"
                  onClick={this.registrate}
                >
                  Зарегистрироваться
                </button>
              </form>
              {!correct && <p className="mt-2">Нужно заполнить все поля, иначе ничего у нас не выйдет. </p>}
              {result
                && 
<p className="mt-2">
  {result}
  <a href="#" data-dismiss="modal">Закрыть</a>
</p>



              }

            </div>
          </div>
        </div>
      </div>

    );
  }

}

RegModal.propTypes = { result: PropTypes.string };

RegModal.defaultProps = { result: '', page: 1 };

const mapDispatchToProps = function(dispatch) {
  return { registrateaction: data => dispatch(registrateaction(data)) };
};

const mapStateToProps = function(state) {
  return {
    result: state.resultOfUserCreate,
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegModal);
