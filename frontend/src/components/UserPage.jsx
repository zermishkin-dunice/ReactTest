import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import { server } from './News';
import Cookies from 'universal-cookie';
import { sendavatar, getAuthorInfo } from '../redux/actions';
import PropTypes from 'prop-types';


const cookies = new Cookies();

class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.avatarchange = this.avatarchange.bind(this);
  }

  componentDidMount() {
    const { getAuthorInfo: getInfo, match } = this.props;


    getInfo(match.params.id);
  }

  avatarchange(event) {
    const data = {
      file: event.target.files[0],
      token: cookies.get('token'),
    };
    const { sendavatar: send } = this.props;


    send(data);
  }


  render() {
    const { info, avatar } = this.props;


    let linktoimage = '';

    let mine = false;


    if (avatar) {
      linktoimage = `${server}uploads/${avatar}`;
    } else {
      linktoimage = `${server}uploads/${info.avatar}`;
    }
    String(cookies.get('id')) === String(info.id) ? mine = true : mine = false;

    return (
      <div className="container">
        <Navigation />
        <div className="row">
          <div className="col">
            <img src={linktoimage} alt={info.first_name} />
          </div>
          <div className="col">
            <h1 className="mt-5">
              {info.first_name}
              {' '}
              {info.last_name}
            </h1>
            <p><i>{info.email}</i></p>
            {mine
            &&
              <div>
                <p>Сменить аватарку: </p>
                <input type="file" className="form-control-file" onChange={this.avatarchange} id="avatar_change" />
              </div>
            }
            {avatar && <p>Аватарка успешно изменена</p>}
          </div>
        </div>
      </div>
    );
  }

}

UserPage.propTypes = {
  avatar: PropTypes.string,
  getAuthorInfo: PropTypes.func.isRequired,
  info: PropTypes.objectOf,
  match: PropTypes.objectOf.isRequired,
  sendavatar: PropTypes.func.isRequired,
};

UserPage.defaultProps = {
  avatar: '',
  info: {
    avatar: '',
    email: '',
    firstname: '',
    lastname: '',
  },
};

const mapStateToProps = function(state) {
  return {
    avatar: state.avatar,
    info: state.authorInfo,
    token: state.token,
    user: state.user,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    getAuthorInfo: data => dispatch(getAuthorInfo(data)),
    sendavatar: data => dispatch(sendavatar(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
