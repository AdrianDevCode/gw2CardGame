import React, {Component} from 'react';
import Nav from './Nav/Nav';
import './Body.css';
import Dragula from 'react-dragula';

export default class HomePage extends Component {
    
    render(){
        if(this.props.location.state.referrer.cards){ 
            let cards = Array.from(this.props.location.state.referrer.cards);
      
            const cardsJSX = cards.map((card) => {
                return(
                    <div className="card" key={card.id}>
                        <div className="cardImage" style={{backgroundImage: `url(${card.petIcon})`}}>
                            <div className="numbers">
                                <div>{card.attackNumbers[0]}</div>
                                <div>{card.attackNumbers[1]} {card.attackNumbers[2]}</div>
                                <div>{card.attackNumbers[3]}</div>
                            </div>
                            <h4>{card.petName}</h4>
                        </div>
                        
                    </div>
                )
            })      
        }
        return(
            
            <div>
                <div>
                    <Nav />
               </div>
               <div className="cards" ref={this.dragulaDecorator}>
                   
               </div>
            </div>
          
        )
    }
    dragulaDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
          let options = { };
          Dragula([componentBackingInstance], options);
        }
      };
}