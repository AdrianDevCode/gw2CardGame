import React, {Component} from 'react';
import Nav from './Nav/Nav';
import './Body.css';
import Card from '../Game/Card/Card';

export default class HomePage extends Component {
    
    render(){
        
        let cards = Array.from(this.props.location.state.referrer.cards); 
        let currentState = {
            cards: cards,
            user: this.props.location.state.referrer.user,
        }                
        return( 
            <div>
                <div>
                    <Nav  currentState = {currentState}/>
               </div>
                   <Card  cards = {cards}/>
            </div>     
        )
    }   
}