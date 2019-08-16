import React from 'react';
import axios from 'axios';
 


class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          news: [],
          test: "test"
        };
      }
    
      componentDidMount() {
        axios.get('http://localhost:8000/get/news/')
          .then(res => {
            const news = res.data;
            this.setState({
                news,
            })
            
          })
      }
    render() {
        const {
            news,
        } = this.state;
        return ( 
            <div className="container">
                <Navigation />
                {
                    news.length !== 0 &&
                    news.map(item => (
                        <New key={item.id} title = {item.title} text={item.text}/>
                    ))
                }
            </div>
        );
    }
}



class Navigation extends React.Component {
    render() {
        return ( 
            <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">Главная</a>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-secondary">Left</button>
                <button type="button" className="btn btn-secondary">Middle</button>
                <button type="button" className="btn btn-secondary">Right</button>
            </div>
        </nav>
        );
    }
}

class New extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            title: "Дефолтный заголовок",
            text: "Дефолтный текст",
        }
    }
    
    render(){
        return(
        <div className="new border p-3 mt-3 rounded">
            <h1>{this.props.title}</h1>
            {this.props.text}          
        </div>
        );
    }
}

export default Container;