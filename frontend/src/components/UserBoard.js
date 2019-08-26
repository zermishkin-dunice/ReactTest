import React from 'react';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { logout, sendavatar } from './actions';
import { server } from './News';


const cookies = new Cookies();

class UserBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.logout = this.logout.bind(this);
        this.avatar_change = this.avatar_change.bind(this);
    }

    componentDidMount() {
        if (this.props.token) {
            cookies.set('token', this.props.token);
        }
    }

    logout() {
        cookies.remove("token");
        cookies.remove("first_name");
        cookies.remove("last_name");
        cookies.remove("id");
        cookies.remove("username");
        this.props.dispatch(logout());
    }

    avatar_change(event) {
        let data = {
            token: cookies.get("token"),
            file: event.target.files[0],
        }
        this.props.dispatch(sendavatar(data));
    }

    

    render() {
        let link_to_profile = 'users/' + cookies.get("id");
        let link_to_image = server + 'uploads/' + cookies.get("avatar");
        
        return (
            <div className="new border p-3 mt-3 rounded flex-fill">
                <div className="row">
                    <div className="col-2">
                    <a href={link_to_profile}><img src={link_to_image} className="img-thumbnail mt-3" alt="Адаптивные изображения" /></a>
                    </div>
                    <div className="col-10">
                        <h2>{cookies.get("first_name")} {cookies.get("last_name")}</h2>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-danger" onClick={this.logout}>Разлогиниться</button>
                            <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal">Добавить новую новость</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        user: state.user,
        token: state.token,
        avatar: state.avatar,
    };
}
export default connect(mapStateToProps)(UserBoard);
