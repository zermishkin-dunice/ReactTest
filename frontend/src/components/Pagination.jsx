import React from 'react';
import { connect } from 'react-redux';
import { gettotal, getnewsonpage, pageaction } from '../redux/actions';
import { newsonpage } from '../config/config';
import PropTypes from 'prop-types';

class Pagination extends React.Component {

  constructor(props) {
    super(props);
    this.state = { page: 1 };
    this.goToBack = this.goToBack.bind(this);
    this.goToForward = this.goToForward.bind(this);
  }


  goToBack() {
    const { page } = this.state;
    const newpage = page - 1;
    const { pageaction: pageaction2, gettotal: gettotal2, getnewsonpage: getnewsonpage2 } = this.props;


    this.setState({ page: newpage });
    pageaction2(newpage);
    gettotal2();
    getnewsonpage2({ newsonpage, page: newpage });
  }

  goToForward() {
    const { page } = this.state;
    const newpage = page + 1;
    const { pageaction: pageaction2, gettotal: gettotal2, getnewsonpage: getnewsonpage2 } = this.props;


    this.setState({ page: newpage });
    pageaction2(newpage);
    gettotal2();
    getnewsonpage2({ newsonpage, page: newpage });
  }

  render() {
    const { page } = this.state;
    const { total } = this.props;


    return (
      <nav aria-label="..." className="mt-2">
        <ul className="pagination">
          {page > 1 && <li className="page-item"><a className="page-link" href="#" onClick={this.goToBack} tabIndex="-1" aria-disabled="true">Назад</a></li>}
          <li className="page-item" aria-current="page">
            <a className="page-link" href="#">
              {page}
              <span className="sr-only">(current)</span>
            </a>
          </li>
          {total > page * newsonpage && <li className="page-item"><a className="page-link" href="#" onClick={this.goToForward}>Вперед</a></li>}
        </ul>
      </nav>
    );
  }

}

Pagination.propTypes = {
  getnewsonpage: PropTypes.func.isRequired,
  gettotal: PropTypes.func.isRequired,
  pageaction: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

const mapStateToProps = function(state) {
  return {
    page: state.page,
    total: state.total,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    getnewsonpage: data => dispatch(getnewsonpage(data)),
    gettotal: data => dispatch(gettotal(data)),
    pageaction: data => dispatch(pageaction(data)),
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Pagination);


