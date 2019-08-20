import React from 'react';
import axios from 'axios';


class New extends React.Component{
    constructor(props){
        super(props);
        this.state ={

        }
    }
    
    get_author(id){
        axios.get(`http://localhost:8000/get/author/${this.props.author}`)
          .then(res => {
            const author_ = res.data;
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
        return(
        <div className="new border p-3 mt-3 rounded">
            <h1>{this.props.title}</h1>
            <p class='font-italic'>{this.state.author_name} {this.state.author_surname}, {this.props.date}</p>
            {this.props.text} <br />    
              
        </div>
        );
    }
}

export default New;