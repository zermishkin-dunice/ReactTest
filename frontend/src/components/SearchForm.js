import React from 'react';

class SearchForm extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            search: 'title',
        }
        this.onChangeSelect = this.onChangeSelect.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
    }
    
    onSubmit(event) {
        event.preventDefault();
        console.log(this.state.search);
      }
     
    onChangeSelect(event){
        this.setState({search: event.target.value});
    }


    render(){
        return(
            <div className="new border p-3 mt-3 rounded">
            <form onSubmit={this.onSubmit}>
                <input type="text" className="form-control" placeholder="Искать..." />
                <select class="form-control mt-3" onChange={this.onChangeSelect}>>
                    <option value="title">По заголовку</option>
                    <option value="text">По задержимому</option>
                    <option value="tags">По тегам</option>
                </select>
                <button type="submit" className="btn btn-primary mt-2">Поискать</button>
            </form>
        </div>
        );
    }
}

export default SearchForm;