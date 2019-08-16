import React from 'react';
import axios from 'axios';
import Navigation from './Navigation'
import New from './New'


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
            const news_ = res.data;
            this.setState({
                news: news_
            });
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


export default Container;