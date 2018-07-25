import React, {Component} from 'react';
import './Nav.css';

export default class Nav extends Component {
    render(){
        return(
            <div className='nav-bar'>
                <button className="play-button"><span>PLAY</span></button>
                <button className="logout-button"><span>LOGOUT</span></button>
                
            </div>
        )
    }
}