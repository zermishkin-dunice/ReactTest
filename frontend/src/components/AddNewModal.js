import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import { sending_news, gettotal, getnewsonpage } from './actions';
import { news_on_page } from './News';

const cookies = new Cookies();

class AddForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.typing_text = this.typing_text.bind(this);
    this.typing_title = this.typing_title.bind(this);
    this.sendnew = this.sendnew.bind(this);
    this.picture_change = this.picture_change.bind(this);
  }

  typing_title(event) {
    this.setState({ title: event.target.value })
  }

  typing_text(event) {
    this.setState({ text: event.target.value })
  }

  picture_change(event){
    this.setState({file: event.target.files[0]});
  }

  sendnew() {
    let data = {
      text: this.state.text,
      title: this.state.title,
      token: cookies.get("token"),
      file: this.state.file,
    };
    console.log("Отправка со страницы");
    this.props.dispatch(sending_news(data));
}

  render() {
    return (
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="exampleModalLabel">Добавить новость </h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form onSubmit={this.sendnew}>
                <input type="text" className="form-control" placeholder="Заголовок" onChange={this.typing_title} />
                <textarea className="form-control mt-3" placeholder="Тело новости" onChange={this.typing_text}></textarea>
                <input type="file" className="form-control" placeholder="Картинка к новости" onChange={this.picture_change} />
                
                <button type="button" class="btn btn-secondary mt-3" data-dismiss="modal">Передумал</button>
                <button type="submit" class="btn btn-primary mt-3 ml-1" data-dismiss="modal" onClick={this.sendnew}>Отправить</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


const mapStateToProps = function (state) {
  return {
    user: state.user,
    total: state.total,
    page: state.page,
    news: state.news,
  };
}

export default connect(mapStateToProps)(AddForm);
