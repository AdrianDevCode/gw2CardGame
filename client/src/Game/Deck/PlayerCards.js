import React, {Component} from 'react';
import Card from '../Card/Card'
import "./PlayerCards.css";

export default class PlayerCards extends Component {
    render() {
        return(
            <div className="deck">
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
}