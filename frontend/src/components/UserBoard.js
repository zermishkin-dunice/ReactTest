import React from 'react';
import Cookies from 'universal-cookie';
import {connect} from 'react-redux';
import { logout, sendavatar } from './actions';
import { server } from './News';


const cookies = new Cookies();

class UserBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        this.logout = this.logout.bind(this);
        this.avatar_change = this.avatar_change.bind(this);
      }
      
    componentDidMount() {
        if (this.props.token){
            cookies.set('token', this.props.token);
            }
        }
    
    logout(){
        cookies.remove("token");
        cookies.remove("first_name");
        cookies.remove("last_name");
        cookies.remove("id");
        cookies.remove("username");
        this.props.dispatch(logout());
    }

    avatar_change(event){
        console.log("Отработка формы на плашке, ", event.target.files[0]);
        let data = {
            token: cookies.get("token"),
            file: event.target.files[0],
        }
        this.props.dispatch(sendavatar(data));
    }

    render(){
          let inlinestyle = {
            maxHeight: "150px",
          }
          let url_avatars = server + "uploads/" + cookies.get('avatar');
          return(
            <div className="new border p-3 mt-3 rounded flex-fill">
                <div className="row">
                    <div className="col-2">
                        <img src={url_avatars} className="img-thumbnail" style={inlinestyle} alt="Адаптивные изображения" />
                    </div>
                    <div className="col-10">
                        <h2>{cookies.get("first_name")} {cookies.get("last_name")}</h2>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-danger" onClick={this.logout}>Разлогиниться</button>
                            <button type="button" className="btn btn-info" data-toggle="modal" data-target="#exampleModal">Добавить новую новость</button>
                        </div>
                        <div className="mt-3">
                            <label for="avatar_change">Сменить аватарку<br /></label>
                            <input type="file" class="form-control-file" onChange={this.avatar_change}id="avatar_change" />
                        </div>    
                        
                    </div>
                  </div>
                  
                  </div>
                  
                  
          )
      }
}

const mapStateToProps = function(state){
    return {
        user: state.user,
        token: state.token,
        avatar: state.avatar,
    };
}
export default connect(mapStateToProps)(UserBoard);
