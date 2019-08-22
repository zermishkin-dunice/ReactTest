import React from 'react';
import Cookies from 'universal-cookie';
import {connect} from 'react-redux';
import { logout } from './actions';

const cookies = new Cookies();

class UserBoard extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
        };
        this.logout = this.logout.bind(this);
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
        this.props.dispatch(logout());
    }

    render(){
          let inlinestyle = {
            maxHeight: "150px",
          }
          return(
            <div className="new border p-3 mt-3 rounded flex-fill">
                <div className="row">
                    <div className="col-4">
                        <img src="http://stuki-druki.com/aforizms/Yuriy-Galcev-01.jpg" className="img-thumbnail" style={inlinestyle} alt="Адаптивные изображения" />
                    </div>
                    <div className="col-8">
                        <h2>{cookies.get("first_name")} {cookies.get("last_name")}</h2>
                        <p>Заслуженный автор новостей на тестовых заданиях</p>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-danger" onClick={this.logout}>Разлогиниться</button>
                            <button type="button" className="btn btn-info">Добавить новую новость</button>
                            
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
    };
}
export default connect(mapStateToProps)(UserBoard);
