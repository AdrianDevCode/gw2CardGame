import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Nav.css';


export default class Nav extends Component {

    render(){
        return(
            <div className='nav-bar'>
                <Link to="/loginSelection" className="login-button"><span>LOGIN</span></Link>
                <Link to="/register" className="register-button"><span>REGISTER</span></Link>
                
            </div>
        )
    }
}