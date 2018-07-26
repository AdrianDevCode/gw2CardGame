import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import LoginSelection from "../LoginSelection/LoginSelection";
import Register from "../Register/Register";
import './Nav.css';


export default class Nav extends Component {

    render(){
        return(
            <div className='nav-bar'>
                <Link to="/loginSelection" className="login-button"><span>LOGIN</span></Link>
                <Link to="/register" className="register-button"><span>REGISTER</span></Link>
                
                <Route path="/loginSelection" component={LoginSelection}/>
                <Route path="/register" component={Register}/>
            </div>
        )
    }
}