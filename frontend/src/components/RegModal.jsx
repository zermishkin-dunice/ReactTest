import React from 'react';
import { connect } from 'react-redux';
import { registrateaction } from './actions';

class RegModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      firstname: '',
      lastname: '',
      email: '',
      correct: true,

    };
    this.typing_login = this.typing_login.bind(this);
    this.typing_password = this.typing_password.bind(this);
    this.typing_firstname = this.typing_firstname.bind(this);
    this.typing_lastname = this.typing_lastname.bind(this);
    this.typing_email = this.typing_email.bind(this);
    this.registrate = this.registrate.bind(this);
  }

  typing_login(event) {
    this.setState({ login: event.target.value });
  }

  typing_password(event) {
    this.setState({ password: event.target.value });
  }

  typing_firstname(event) {
    this.setState({ firstname: event.target.value });
  }

  typing_lastname(event) {
    this.setState({ lastname: event.target.value });
  }

  typing_email(event) {
    this.setState({ email: event.target.value });
  }

  registrate(event) {
    event.preventDefault();
    const data = {
      username: this.state.login,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
    };

    if (this.state.login && this.state.password && this.state.firstname && this.state.lastname && this.state.email) {
      this.setState({ correct: true });
      this.props.dispatch(registrateaction(data));
      this.setState({
        login: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
      });
    } else {
      this.setState({ correct: false });
    }
  }


  render() {
    return (
      <div className="modal fade" id="RegModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                <input type="text" required className="form-control" placeholder="Логин" onChange={this.typing_login} />
                <input type="password" required className="form-control mt-3" placeholder="Пароль" onChange={this.typing_password} />
                <input type="text" required className="form-control mt-3" placeholder="Имя" onChange={this.typing_firstname} />
                <input type="text" required className="form-control mt-3" placeholder="Фамилия" onChange={this.typing_lastname} />
                <input type="e-mail" required className="form-control mt-3" placeholder="E-Mail" onChange={this.typing_email} />
                <button type="button" className="btn btn-secondary mt-3" data-dismiss="modal">Закрыть</button>
                <button type="button" className="btn btn-primary mt-3 ml-2" onClick={this.registrate}>Зарегистрироваться</button>
              </form>
              {!this.state.correct && <p className="mt-2">Нужно заполнить все поля, иначе ничего у нас не выйдет. </p>}
              {this.props.result
&& 
<p className="mt-2">
  {this.props.result}
  {' '}
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

const mapStateToProps = function(state) {
  return {
    user: state.user,
    result: state.user_create_result,
  };
};

export default connect(mapStateToProps)(RegModal);
