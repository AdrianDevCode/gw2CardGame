import React, {Component} from 'react';
import './Nav.css';


export default class Nav extends Component {

    render(){
        return(
            <div className='nav-bar'>
                <button className="login-button"><span>LOGIN</span></button>
                <button className="register-button"><span>REGISTER</span></button>
                
            </div>
        )
    }
}