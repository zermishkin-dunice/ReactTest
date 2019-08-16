import React from 'react';

class Navigation extends React.Component {
    render() {
        return ( 
            <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">Главная</a>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-secondary">Left</button>
                <button type="button" className="btn btn-secondary">Middle</button>
                <button type="button" className="btn btn-secondary">Right</button>
            </div>
        </nav>
        );
    }
}

export default Navigation;