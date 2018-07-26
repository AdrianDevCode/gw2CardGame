import React, {Component} from "react";
import "./Register.css";
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }
    login = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/auth/login',
            data: {
                username: e.target.username.value,
                password: e.target.password.value,
            }
        })
        .then((res) => {
            this.setState({
                user: res.data.user,
            })
            console.log(res);
        })
        .catch((res) => {
            console.log(res);
        });
    }

    
    render() {
        return (
            <div className="registerLocal">
                <form onSubmit={this.login}>
                    <div className="form-field">
                        <label htmlFor="username">Username:</label>
                        <input name="username" type="text" />
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