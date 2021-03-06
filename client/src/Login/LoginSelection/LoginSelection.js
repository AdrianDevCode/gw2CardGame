import React, {Component} from "react";
import "./LoginSelection.css";
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class LoginSelection extends Component {
    constructor() {
        super();
        this.state = {
            user: null,
            cards: null,
            redirect: false,
        }
        this.login = this.login.bind(this);
        this.github = this.github.bind(this);
    }
    
    login = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/auth/login',
            data: {
                username: event.target.username.value,
                password: event.target.password.value,
            }
        })
        .then((res) => {
            this.setState({
                user: res.data.username,
                cards: res.data.cards,
                redirect: true,
            })
        
        })
        .catch((res) => {
            console.log(res);
        });
    }
    github = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/auth/github'
        }).then((res) => {
            this.setState({
                user: res.data.username,
                cards: res.data.cards,
                redirect: true,
            })
            console.log(res)
        })
        .catch((res) => {
            console.log(res);
        });
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/home',
                state: { referrer: this.state }
              }}/>
        }
        return (
            
            <div className="loginChoices">
               <div className="loginLocal">
                    <form onSubmit={this.login}>
                        <div className="form-field">
                            <label htmlFor="username">Username:</label>
                            <input name="username" type="text" className="text" />
                        </div>
                        <div className="form-field">
                            <label htmlFor="password">Password:</label>
                            <input name="password" type="password" />
                        </div>
                        <button type="submit" className="registerButton">Login</button>
                    </form>
                    <a href="/auth/github"><button className="loginBtn loginBtn-github">Login with Github</button></a>
                    <button className="loginBtn loginBtn-google">Login with Google</button>  
                </div> 
            </div>     
        )
    }
}