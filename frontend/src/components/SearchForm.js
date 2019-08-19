import React from 'react';
import store from './store';
import {connect} from 'react-redux';
import axios from 'axios';

class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            search: 'title',
            word: '',
        }
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        
    }
    
    onSubmit(event) {
        event.preventDefault();
        console.log(this.state.search);
        axios.get(`http://localhost:8000/get/news/search/?type=${this.state.search}&word=${this.state.word}`)
          .then(res => {
            const news_ = res.data;
            store.dispatch({
                type: "GET_NEWS",
                news: news_,
            })
            
          })
      }
     
    onChangeSelect(event){
        this.setState({search: event.target.value});
    }

    onChangeText(event){
        this.setState({word: event.target.value});
    }

    render(){
        return(
            <div className="new border p-3 mt-3 rounded">
            <form onSubmit={this.onSubmit}>
                <input type="text" className="form-control" placeholder="Искать..." onChange={this.onChangeText} />
                <select class="form-control mt-3" onChange={this.onChangeSelect}>>
                    <option value="title">По заголовку</option>
                    <option value="text">По содержимому</option>
                    <option value="tags">По тегам</option>
                </select>
                <button type="submit" className="btn btn-primary mt-2">Поискать</button>
            </form>
        </div>
        );
    }
}

const mapStateToProps = function(state){
    return {
        news: state.news
    };
}

export default connect(mapStateToProps)(SearchForm);