import React, {Component} from 'react';
import Draggable from 'react-draggable';
import './Card.css';

export default class Card extends Component {
    
    
    render() {
        const cardsJSX = this.props.cards.map((card) => {
            return(
                <Draggable handle=".handle" position={null} onStart={this.handleStart} onDrag={this.handleDrag} onStop={this.handleStop}>
                    <div className="handle card" key={card.id}>
                        <div className="border">
                            <div className="cardImage" style={{backgroundImage: `url(${card.petIcon})`}}>
                                <div className="numbers">
                                    <div>{card.attackNumbers[0]}</div>
                                    <div>{card.attackNumbers[1]} {card.attackNumbers[2]}</div>
                                    <div>{card.attackNumbers[3]}</div>
                                </div>
                                
                            </div>
                            <div className="frame-header">
                            <h4 className="name">{card.petName}</h4>
                            </div>
                        </div>
                        <div className="frame-text-box">
                        <p className="description ftb-inner-margin">{card.petDescription}</p>
                        </div>
                    </div>
                </Draggable>
            )
        }) 
        return(
               <div className="cards">
                    {cardsJSX}
               </div>
        )
    }
}

