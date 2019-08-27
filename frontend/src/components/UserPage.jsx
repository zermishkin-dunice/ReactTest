import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import { server } from './News';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { sendavatar } from './actions';

const cookies = new Cookies();

class UserPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { is_mine: false };
    this.avatar_change = this.avatar_change.bind(this);
  }

  componentDidMount() {
    axios.get(`${server}api/author/${this.props.match.params.id}`).then(response => this.setState({
      username: response.data.username,
      avatar: response.data.avatar,
      firstname: response.data.first_name,
      lastname: response.data.last_name,
      email: response.data.email,
      date_joined: response.data.date_joined,
      id: response.data.id,
    }));
  }

  avatar_change(event) {
    const data = {
      token: cookies.get('token'),
      file: event.target.files[0],
    };

    this.props.dispatch(sendavatar(data));
  }


  render() {
    let linktoimage = '';


    if (this.props.avatar) {
      linktoimage = `${server}uploads/${this.props.avatar}`;
    } else {
      linktoimage = `${server}uploads/${this.state.avatar}`;
    }

    const is_mine = cookies.get('id') == this.state.id;


    return (
      <div className="container">
        <Navigation />
        <div className="row">
          <div className="col">
            <img src={linktoimage} />
          </div>
          <div className="col">
            <h1 className="mt-5">
              {this.state.firstname}
              {' '}
              {this.state.lastname}
            </h1>
            <p><i>{this.state.email}</i></p>
            { is_mine
                        && <div>
  <label htmlFor="avatar_change">
Сменить аватарку
    <br />
  </label>
  <input type="file" className="form-control-file" onChange={this.avatar_change} id="avatar_change" />
</div>


            }
            { this.props.avatar && <p>Аватарка успешно изменена</p>}

          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = function(state) {
  return {
    user: state.user,
    token: state.token,
    avatar: state.avatar,
  };
};

export default connect(mapStateToProps)(UserPage);
