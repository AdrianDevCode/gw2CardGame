import React, {Component} from "react";
import { Redirect } from 'react-router-dom';
import "./Register.css";
import axios from 'axios';

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state= {
            redirect: false,
            user: null,
            cards: null,
            
        }
        this.register = this.register.bind(this);
        
    }
    getPetIDs(data){
        let petIDs = data.map(card => {
           return this.cardIDs = card.petID
        })
        return petIDs;
    }
    componentWillMount() {
        axios({
            method: 'get',
            url: '/cards/getCards'
          }).then(randomCards => {
              this.setState({
                cards: randomCards.data,
              }) 
          })
    }
    
    register = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/auth/signup',
            data: {
                username: e.target.username.value,
                password: e.target.password.value,
                cards: this.state.cards
                
            }
        })
        .then((res) => {
            if(res.data.error){
                return alert("sorry username already taken"); 
            }
            this.setState({
                user: res.data.username,
                redirect: true,
            })
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
        console.log(this.state)
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