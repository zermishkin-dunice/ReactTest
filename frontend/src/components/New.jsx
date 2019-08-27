import React from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { server } from './News';

const cookies = new Cookies();

class New extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  get_author(id) {
    axios.get(`${server}api/author/${this.props.author}`)
      .then(res => {
        this.setState({
          author_name: res.data.first_name,
          author_surname: res.data.last_name,

        });
      });
  }

  componentDidMount() {
    this.get_author(this.props.id);
  }

  render() {
    const image_scr = `${server}uploads/${this.props.picture}`;

    const link = `users/${this.props.author}`;


    return (
      <div className="new border p-3 mt-3 rounded">
        <h1>{this.props.title}</h1>
        <i>
          <p className="font-italic">
            <a href={link}>
              {this.state.author_name}
              {' '}
              {this.state.author_surname}
            </a>
,
            {' '}
            {this.props.date}
          </p>
        </i>

        <img src={image_scr} alt={this.props.title} className="rounded mx-auto d-block img-fluid" />
        {this.props.text}
        {' '}
        <br />

      </div>
    );
  }

}

export default New;
