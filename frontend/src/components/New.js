import React from 'react';

class New extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            title: "Дефолтный заголовок",
            text: "Дефолтный текст",
        }
    }
    
    render(){
        return(
        <div className="new border p-3 mt-3 rounded">
            <h1>{this.props.title}</h1>
            {this.props.text}          
        </div>
        );
    }
}

export default New;