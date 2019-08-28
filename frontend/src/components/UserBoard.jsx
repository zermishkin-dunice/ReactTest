import React from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { logout } from './actions';
import { server } from './News';
import PropTypes from 'prop-types';


const cookies = new Cookies();

class UserBoard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;


    if (token) {
      cookies.set('token', token);
    }
  }

  logout() {
    cookies.remove('token');
    cookies.remove('first_name');
    cookies.remove('last_name');
    cookies.remove('id');
    cookies.remove('username');
    const { logout: logoutpr } = this.props;


    logoutpr();
  }


  render() {
    const linktoprofile = `users/${cookies.get('id')}`;

    const linktoimage = `${server}uploads/${cookies.get('avatar')}`;

    return (
      <div className="new border p-3 mt-3 rounded flex-fill">
        <div className="row">
          <div className="col-2">
            <a href={linktoprofile}>
              <img
                src={linktoimage}
                className="img-thumbnail mt-3"
                alt="Адаптивные изображения"
              />
            </a>
            <i><p className="text-left">click to user page</p></i>
          </div>
          <div className="col-10">
            <h2>
              {cookies.get('first_name')}
              {' '}
              {cookies.get('last_name')}
            </h2>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.logout}
              >
Разлогиниться
              </button>
              <button
                type="button"
                className="btn btn-info"
                data-toggle="modal"
                data-target="#exampleModal"
              >
Добавить новую новость
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

UserBoard.propTypes = {
  logoutpr: PropTypes.func,
  token: PropTypes.string,
};

UserBoard.defaultProps = {
  logoutpr: null,
  token: '',
};


const mapStateToProps = function(state) {
  return {
    avatar: state.avatar,
    token: state.token,
    user: state.user,

  };
};

const mapDispatchToProps = function(dispatch) {
  return { logout: () => dispatch(logout()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBoard);
