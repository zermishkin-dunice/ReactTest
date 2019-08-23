import React from 'react';
import {connect} from 'react-redux';
import { authorize } from './actions';

class AuthForm extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
        this.authorizate = this.authorizate.bind(this);
        this.typing_login = this.typing_login.bind(this);
        this.typing_password = this.typing_password.bind(this);
    }

    authorizate(event){
        event.preventDefault();
        let data = {
            login: this.state.login, 
            pass: this.state.password
        }
        this.props.dispatch(authorize(data));
        this.setState({user: this.props.user});
    }

    typing_login(event){
        this.setState({login: event.target.value})
    }

    typing_password(event){
        this.setState({password: event.target.value})
    }

    

    render(){
        return(
            <div className="new border p-3 mt-3 rounded flex-fill">
                <form onSubmit={this.authorizate}>
                    <input type="text" className="form-control" placeholder="Логин" onChange={this.typing_login}/>
                    <input type="password" className="form-control mt-3" placeholder="Пароль" onChange={this.typing_password}/>
                    <button type="submit" className="btn btn-primary mt-2">Авторизация</button>
                    { this.props.user && 
                    <div class="alert alert-danger mt-2 ml-2 " role="alert">Неверный логин или пароль. Попробуй еще.</div>
                    }
                </form>
            </div>
        );
    }
}

const mapStateToProps = function(state){
    return {
        user: state.user,        
    };
}

export default connect(mapStateToProps)(AuthForm);