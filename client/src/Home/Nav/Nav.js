import React, {Component} from 'react';
import './Nav.css';

export default class Nav extends Component {
    render(){
        return(
            <div className='nav-bar'>
                <button className="play-button">Play</button>
                <button className="logout-button">Logout</button>
            </div>
        )
    }
}