import React from 'react';
import axios from 'axios';
import store from './store';
import {connect} from 'react-redux';
import Navigation from './Navigation';
import SearchForm from './SearchForm';
import New from './New';
import Pagination from './Pagination';

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          news: [],
          page: 1,
          total: 0,
        };
      }
    
      componentDidMount() {
        axios.get('http://localhost:8000/get/news/', {params: {page: this.state.page}})
          .then(res => {
            const news_ = res.data;
            store.dispatch({
                type: "GET_NEWS",
                news: news_,
            })
          });
        axios.get('http://localhost:8000/get/news/total/')
          .then(res => {
            const total_ = res.data;
            console.log(res.data);
            this.setState({total: total_});       
          });
      }

    render() {
        const {
            news,
        } = this.props;
        return (
            <div className="container">
                <Navigation />
                <SearchForm />
                {   
                    news &&
                    news.length !== 0 &&
                    news.map(item => (
                        <New key={item.id} title = {item.title} text={item.text} author={item.author} date={item.date}/>
                    ))
                }
                { news && news.length !== 0 && <Pagination total={this.state.total}/>}
            </div>
        );
    }
}


const mapStateToProps = function(state){
    return {
        news: state.news,
    };
}

export default connect(mapStateToProps)(Container);