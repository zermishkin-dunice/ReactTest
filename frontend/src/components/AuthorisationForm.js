import React from 'react';

class AuthForm extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render(){
        return(
            <div className="new border p-3 mt-3 rounded flex-fill">
                <form method="GET">
                    <input type="text" className="form-control" placeholder="Логин" />
                    <input type="password" className="form-control mt-3" placeholder="Пароль" />
                    <button type="submit" className="btn btn-primary mt-2">Авторизация</button>
                </form>
            </div>
        );
    }
}

export default AuthForm;