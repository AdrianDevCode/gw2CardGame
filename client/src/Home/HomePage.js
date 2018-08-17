import React, {Component} from 'react';
import Nav from './Nav/Nav';
import './HomePage.css';
import Draggable from 'react-draggable';


export default class HomePage extends Component {
    
    render(){
        
        let cards = Array.from(this.props.location.state.referrer.cards); 
        const homeCardsJSX = cards.map((card) => {
            let petName = card.petName.replace(/juvenile/i, "");
        
            return(
                
                <Draggable handle=".handle" position={null} onStart={this.handleStart} onDrag={this.handleDrag} onStop={this.handleStop} key={card.id}>
                    <div className="handle home-card" >
                        <div className="home-cardBorder">
                            <div className="home-cardImage" style={{backgroundImage: `url(${card.petIcon})`}}>
                                <div className="home-numbers">
                                    <div>{card.attackNumbers[0]}</div>
                                    <div>{card.attackNumbers[1]} {card.attackNumbers[2]}</div>
                                    <div>{card.attackNumbers[3]}</div>
                                </div>
                                
                            </div>
                            <div className="home-frame-header">
                            <h4 className="home-name">{petName}</h4>
                            </div>
                        </div>
                        <div className="home-frame-text-box">
                        <p className="home-description home-ftb-inner-margin">{card.petDescription}</p>
                        </div>
                    </div>
                </Draggable>
              )
        })
        let currentState = {
            cards: cards,
            user: this.props.location.state.referrer.user,
        }                
        return( 
            <div>
                <div>
                    <Nav  currentState = {currentState}/>
               </div>
               <div className="home-cards">
                   {homeCardsJSX}
                   </div>
            </div>     
        )
    }   
}