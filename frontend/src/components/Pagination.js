import React from 'react';
import {connect} from 'react-redux';
import store from './store';
import axios from 'axios';

class Pagination extends React.Component{
    constructor(props){
        super(props);
        this.state={
            page: 1,
            is_there_next_page: true,
        }
    this.goToBack = this.goToBack.bind(this);
    this.goToForward = this.goToForward.bind(this);
    
    } 
    
    
    goToBack(){
        let new_page = this.state.page-1;
        this.setState({page: new_page});
        store.dispatch({
            type: "PAGE",
            page: new_page,
        })
        axios.get('http://localhost:8000/get/news/', {params: {page: new_page}})
          .then(res => {
            const news_ = res.data;
            store.dispatch({
                type: "GET_NEWS",
                news: news_,
            })
            
          });
        
    }

    goToForward(){
        let new_page = this.state.page + 1;
        this.setState({page: new_page});
        axios.get('http://localhost:8000/get/news/', {params: {page: new_page}})
          .then(res => {
            const news_ = res.data;
            store.dispatch({
                type: "GET_NEWS",
                news: news_,
            })
            
          })
        store.dispatch({
            type: "PAGE",
            page: new_page,
        });
        
    }
    
    
    
    render(){
        return(
            <nav aria-label="..." class='mt-2'>
                <ul class="pagination">
                    { this.state.page > 1 && <li class="page-item"><a class="page-link" href="#" onClick={this.goToBack} tabindex="-1" aria-disabled="true">Назад</a></li>}
                    <li class="page-item" aria-current="page"><a class="page-link" href="#">{this.state.page}<span class="sr-only">(current)</span></a></li>
                    
                    { this.props.total > this.state.page*3 && <li class="page-item"><a class="page-link" href="#" onClick={this.goToForward}>Вперед</a> </li> }
                    </ul>
            </nav>
        )
    }
}

const mapStateToProps = function(state){
    return {
        page: state.page,    
    };
}

export default connect(mapStateToProps)(Pagination);


