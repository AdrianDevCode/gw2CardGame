import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
import "./Register.css";
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state= {
            redirect: false,
        }
        this.register = this.register.bind(this);
        
    }
    register = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/auth/signup',
            data: {
                username: e.target.username.value,
                password: e.target.password.value,
            }
        })
        .then((res) => {
            this.setState({
                user: res.data.user,
                redirect: true,
            })
            console.log(res);
        })
        .catch((res) => {
            console.log(res);
        });
    }

    
    render() {
        if (this.state.redirect) {
            return <Redirect to='/home' />
        }
        return (
            <div className="registerLocal">
                <form onSubmit={this.register}>
                    <div className="form-field">
                        <label htmlFor="username">Username:</label>
                        <input name="username" type="text" className="text" />
                    </div>
                    <div className="form-field">
                        <label htmlFor="password">Password:</label>
                        <input name="password" type="password" />
                    </div>
                    <button type="submit" className="registerButton">Register</button>
                </form>     
            </div>
        )
    }
}