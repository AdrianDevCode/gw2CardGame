import React, {Component} from 'react';
import Nav from "./Nav/Nav";
import "./LoginPage.css";

export default class LoginPage extends Component {
   
    render(){
        return(
        
            <div className="login">
                <Nav />
                <div className="title">
                    <span>Card Game</span>
                </div>
            </div>
            
        )
    }
}