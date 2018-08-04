import React, {Component} from 'react';
import './Nav.css';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.user,
            redirect: false,
        };

        this.logout = this.logout.bind(this);
    }

    logout =  () => {
        axios({
            method: 'get',
            url: '/auth/logout'
        })
        .then(() => {
            this.setState({
                user: null,
                redirect: true,
            })
        })
        .catch((res) => {
            console.log(res);
        });
    }
    render(){
        if(this.state.redirect){
           return <Redirect to="/" />
        }
        return(
            <div className='nav-bar'>
                <Link to='/board'><button  className="play-button"><span>PLAY</span>></button></Link>
                <button onClick={this.logout} className="logout-button"><span>LOGOUT</span></button>
                
            </div>
        )
    }
}