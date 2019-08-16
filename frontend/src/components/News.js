import React from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import New from './New';
import store from './store';
import {connect} from 'react-redux';

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
            store.dispatch({
                type: "GET_NEWS",
                news: news_,
            })
            
          })
      }

    render() {
        const {
            news,
        } = this.props;
        return (
            <div className="container">
                <Navigation />
                {   
                    news &&
                    news.length !== 0 &&
                    news.map(item => (
                        <New key={item.id} title = {item.title} text={item.text}/>
                    ))
                }
            </div>
        );
    }
}


const mapStateToProps = function(state){
    return {
        news: state.news
    };
}

export default connect(mapStateToProps)(Container);