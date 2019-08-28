import React from 'react';
import { server } from './News';
import { connect } from 'react-redux';
import { author } from './actions';
import PropTypes from 'prop-types';
import _ from 'lodash';

class New extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getAuthor2, writer } = this.props;


    getAuthor2(writer);
  }

  render() {
    const { authors, picture, writer, date, title, text } = this.props;
    const image = `${server}uploads/${picture}`;
    const link = `users/${writer}`;
    const authorInstance = _.find(authors, { id: writer });
    const fn = _.get(authorInstance, 'first_name', 'Имя');
    const ln = _.get(authorInstance, 'last_name', 'Имя');


    return (
      <div className="new border p-3 mt-3 rounded">
        <h1>{title}</h1>
        <i>
          <p className="font-italic">
            <a href={link}>
              {fn}
              {' '}
              {ln}
            </a>
            ,
            {' '}
            {date}
          </p>
        </i>
        <img src={image} alt={title} className="rounded mx-auto d-block img-fluid" />
        {text}
        {' '}
        
      </div>
    );
  }

}

New.propTypes = {
  authors: PropTypes.array,
  date: PropTypes.string,
  getAuthor2: PropTypes.func.isRequired,
  picture: PropTypes.string,
  text: PropTypes.string,
  title: PropTypes.string,
  writer: PropTypes.string,
};

New.defaultProps = {
  authors: [],
  date: '',
  picture: '',
  text: '',
  title: '',
  writer: '',
};

const mapStateToProps = function(state) {
  return { authors: state.authorlist };
};

const mapDispatchToProps = function(dispatch) {
  return { getAuthor2: data => dispatch(author(data)) };
};


export default connect(mapStateToProps, mapDispatchToProps)(New);
