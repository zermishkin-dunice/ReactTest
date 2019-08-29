import React from 'react';
import store from './store';
import { connect } from 'react-redux';
import axios from 'axios';
import { server } from './News';
import { searching } from './actions';

class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: 'title',
      word: '',
    };
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    // axios.get(`${server}api/news/search/?type=${this.state.search}&word=${this.state.word}`)
    //   .then(res => {
    //     const news_ = res.data;


    //     store.dispatch({
    //       news: news_,
    //       type: 'GET_NEWS',

    //     });
    //   });
    const { search, word} = this.state;
    const {searching: my_search} = this.props;
    const data = {
      type: search, 
      word: word,
    }
    my_search(data);
  }

  onChangeSelect(event) {
    this.setState({ search: event.target.value });
  }

  onChangeText(event) {
    this.setState({ word: event.target.value });
  }

  render() {
    return (
      <div className="new border p-3 mt-3 mr-3 rounded flex-fill col-5">
        <form onSubmit={this.onSubmit}>
          <input type="text" className="form-control" placeholder="Искать..." onChange={this.onChangeText} />
          <select className="form-control mt-3" onChange={this.onChangeSelect}>
            <option value="title">По заголовку</option>
            <option value="text">По содержимому</option>
          </select>
          <button type="submit" className="btn btn-primary mt-2">Поискать</button>
        </form>
      </div>
    );
  }

}

const mapStateToProps = function(state) {
  return { news: state.news };
};

const mapDispatchToProps = function(dispatch){
  return{ 
    searching: (data) => dispatch(searching(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
