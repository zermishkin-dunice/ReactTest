import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class New extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }
    
    get_author(id){
        axios.get(`http://localhost:8000/api/author/${this.props.author}`)
          .then(res => {
            this.setState({
                author_name: res.data.first_name,
                author_surname: res.data.last_name,
                
            })
            })
    }

    componentDidMount() {
        this.get_author(this.props.id);       
    }

    render(){
        let image_scr = "http://127.0.0.1:8000/uploads/" + this.props.picture;
        let id = cookies.get("id");
        return(
        <div className="new border p-3 mt-3 rounded">
            <h1>{this.props.title}</h1>
            <i><a href="#">{ id == this.props.author ? "Изменить картинку записи" : "" }</a></i>
            <p class='font-italic'>{this.state.author_name} {this.state.author_surname}, {this.props.date}</p>
            <img src={image_scr} alt={this.props.title} class="rounded mx-auto d-block img-fluid" />
            {this.props.text} <br />    
              
        </div>
        );
    }
}

export default New;