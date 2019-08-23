import React from 'react';
import {connect} from 'react-redux';
import Navigation from './Navigation';
import SearchForm from './SearchForm';
import New from './New';
import Pagination from './Pagination';
import AuthForm from './AuthorisationForm';
import { gettotal, getnewsonpage } from './actions'
import UserBoard from './UserBoard';
import Cookies from 'universal-cookie';
import AddNewModal from './AddNewModal';

export const news_on_page = 5;
const cookies = new Cookies();

class Container extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          news: [],
          page: 1, 
          token: null,         
        };
      } 

      componentDidMount() {
      this.props.dispatch(gettotal());
      let _data = {
        page: this.state.page, 
        news_on_page: news_on_page,
      }
      this.props.dispatch(getnewsonpage(_data));
      }

    render() {
        const {
            news,
        } = this.props;
        
        let user = this.props.user;

        return (
            <div className="container">
                <Navigation />
                <div class='d-flex justify-content-between'>
                <SearchForm />
                { (cookies.get("token")) ? <UserBoard /> : <AuthForm />}
                </div>
                {   
                    news &&
                    news.length !== 0 &&
                    news.map(item => (
                        <New key={item.id} title = {item.title} text={item.text} author={item.author} date={item.date} picture={item.picture}/>
                    ))
                }
                { news && news.length !== 0 && <Pagination total={this.props.total}/>}
                
                { (cookies.get("token")) && <AddNewModal /> }
                
            </div>
        );
    }
}


const mapStateToProps = function(state){
    return {
        news: state.news,
        total: state.total,
        page: state.page,
        user: state.user,        
    };
}

export default connect(mapStateToProps)(Container);