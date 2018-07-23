import React, {Component} from 'react';
import Card from '../Card/Card'
import "./PlayerCards.css";

export default class PlayerCards extends Component {
    render() {
        return(
            <div className="deck">
                <Card className="card1"/>
                <Card className="card2"/>
                <Card className="card3"/>
                <Card className="card4"/>
                <Card className="card5"/>}
            </div>
        )
    }
}