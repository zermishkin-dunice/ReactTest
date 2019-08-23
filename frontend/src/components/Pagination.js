import React from 'react';
import {connect} from 'react-redux';
import { gettotal, getnewsonpage, page_action } from './actions';
import { news_on_page } from './News'

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
        this.props.dispatch(page_action(new_page))
        this.props.dispatch(gettotal());
        this.props.dispatch(getnewsonpage({page: new_page, news_on_page}));
    }

    goToForward(){
        let new_page = this.state.page + 1;
        this.setState({page: new_page});
        this.props.dispatch(page_action(new_page))
        this.props.dispatch(gettotal());
        this.props.dispatch(getnewsonpage({page: new_page, news_on_page}));        
    }
    
    
    
    render(){
        return(
            <nav aria-label="..." class='mt-2'>
                <ul class="pagination">
                    { this.state.page > 1 && <li class="page-item"><a class="page-link" href="#" onClick={this.goToBack} tabindex="-1" aria-disabled="true">Назад</a></li>}
                    <li class="page-item" aria-current="page"><a class="page-link" href="#">{this.state.page}<span class="sr-only">(current)</span></a></li>
                    { this.props.total > this.state.page*news_on_page && <li class="page-item"><a class="page-link" href="#" onClick={this.goToForward}>Вперед</a> </li> }
                    </ul>
            </nav>
        )
    }
}

const mapStateToProps = function(state){
    return {
        page: state.page,
        total: state.total,    
    };
}

export default connect(mapStateToProps)(Pagination);


