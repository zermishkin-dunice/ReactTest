import React from 'react';
import { connect } from 'react-redux';
import Navigation from './Navigation';
import SearchForm from './SearchForm';
import New from './New';
import Pagination from './Pagination';
import AuthForm from './AuthorisationForm';
import { gettotal, getnewsonpage } from './actions';
import UserBoard from './UserBoard';
import Cookies from 'universal-cookie';
import AddNewModal from './AddNewModal';
import PropTypes from 'prop-types';

export const newsonpage = 5;
export const server = 'http://127.0.0.1:8000/';


const cookies = new Cookies();

class Container extends React.Component {

  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }

  componentWillMount() {
    const { page } = this.state;
    const { gettotal: gettotalnews, getnewsonpage: getnews,  } = this.props;

    gettotalnews();

    const data = {
      newsonpage,
      page,
    };

    getnews(data);
  }


  render() {
    const { news, total } = this.props;

    return (
      <div className="container">
        <Navigation />
        <div className="d-flex justify-content-between">
          <SearchForm />
          {cookies.get('token') ? <UserBoard /> : <AuthForm />}
        </div>
        {
          news
          && news.length !== 0
          && news.map(item => <New key={item.id} title={item.title} text={item.text} writer={item.author} date={item.date} picture={item.picture} />)
        }
        {news && news.length !== 0 && <Pagination total={total} />}

        {cookies.get('token') && <AddNewModal />}

      </div>
    );
  }

}

Container.propTypes = {
  getnewsonpage: PropTypes.func.isRequired,
  gettotal: PropTypes.func.isRequired,
  news: PropTypes.objectOf.isRequired,
  total: PropTypes.number,
  resultofsending: PropTypes.string,
};

Container.defaultProps = { total: 1 };

const mapStateToProps = function(state) {
  return {
    avatar: state.avatar,
    news: state.news,
    page: state.page,
    resultofsending: state.resultofsending,
    total: state.total,
    user: state.user,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    getnewsonpage: data => dispatch(getnewsonpage(data)),
    gettotal: () => dispatch(gettotal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Container);
