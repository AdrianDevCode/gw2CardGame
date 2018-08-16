import React, {Component} from 'react';
import './Nav.css';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logoutRedirect: false,
            playRedirect: false,
            aiCards: null,
            playerCards: this.props.currentState.cards,
        };

        this.logout = this.logout.bind(this);
        this.play = this.play.bind(this);
    }

    logout =  () => {
        axios({
            method: 'get',
            url: '/auth/logout'
        })
        .then(() => {
            this.setState({
                logoutRedirect: true,
            })
        })
        .catch((res) => {
            console.log(res);
        });
    }
    play = () => {
        axios({
            method: 'get',
            url: '/cards/getCards'
          }).then(randomCards => {
              this.setState({
                aiCards: randomCards.data,
                playRedirect: true,
              }) 
          })
    }
    render(){
        
        if (this.state.playRedirect) {  
            return <Redirect to={{
                pathname: '/singleplayer',
                state: { referrer: this.state}
              }}/>
        }
        if(this.state.logoutRedirect){
           return <Redirect to="/" />
        }
        
        return(
            <div className='nav-bar'>
                <button onClick= {this.play} className="play-button"><span>PLAY</span></button>
                <button onClick={this.logout} className="logout-button"><span>LOGOUT</span></button>          
            </div>
        )
    }
}