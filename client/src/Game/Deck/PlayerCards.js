import React, {Component} from 'react';
import Dragula from 'react-dragula';
import Card from '../Card/Card'
import "./PlayerCards.css";

export default class PlayerCards extends Component {
    render() {
        return(
            <div className="deck" ref={this.dragulaDecorator}>
                <div className="card-container">
                <Card />
                </div>
                <div className="card-container">
                <Card />
                </div>
                <div className="card-container">
                <Card />
                </div>
                <div className="card-container">
                <Card />
                </div>
                <div className="card-container">
                <Card />
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