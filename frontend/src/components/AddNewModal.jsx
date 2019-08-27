import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { sendingnews } from './actions';
import PropTypes from 'prop-types';


const cookies = new Cookies();

class AddForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.typingtext = this.typingtext.bind(this);
    this.typingtitle = this.typingtitle.bind(this);
    this.sendnew = this.sendnew.bind(this);
    this.picturechange = this.picturechange.bind(this);
  }

  typingtitle(event) {
    this.setState({ title: event.target.value });
  }

  typingtext(event) {
    this.setState({ text: event.target.value });
  }

  picturechange(event) {
    this.setState({ file: event.target.files[0] });
  }

  sendnew() {
    const { text, title, file } = this.state;
    const { sendingnews: send, page } = this.props;
    const data = {
      file,
      page,
      text,
      title,
      token: cookies.get('token'),
    };


    send(data);
  }

  render() {
    return (
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">Добавить новость </h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <input type="text" className="form-control" placeholder="Заголовок" onChange={this.typingtitle} />
                <textarea className="form-control mt-3" placeholder="Тело новости" onChange={this.typingtext} />
                <input type="file" className="form-control" placeholder="Картинка к новости" onChange={this.picturechange} />

                <button type="button" className="btn btn-secondary mt-3" data-dismiss="modal">Передумал</button>
                <button type="button" className="btn btn-primary mt-3 ml-1" data-dismiss="modal" onClick={this.sendnew}>Отправить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

AddForm.propTypes = { sendingnews: PropTypes.func.isRequired, page: PropTypes.number };
AddForm.defaultProps = { page: 1 };

const mapStateToProps = function(state) {
  return {
    user: state.user,
    total: state.total,
    page: state.page,
    news: state.news,
  };
};

const mapDispatchToProps = function(dispatch) {
  return { sendingnews: data => dispatch(sendingnews(data)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddForm);
