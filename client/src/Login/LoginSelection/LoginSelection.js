import React, {Component} from "react";
import "./LoginSelection.css";
import {Link, Route} from 'react-router-dom';

export default class LoginSelection extends Component {
    render() {
        return (
            <div className="loginChoices">
                
                <Link to="" className="loginBtn loginBtn-github">Login with Github</Link>
                
                <Link to="" className="loginBtn loginBtn-google">Login with Google</Link>
                
                <Route path="" component=""/>
                <Route path="" component=""/>
            </div>
        )
    }
}