import React, {Component} from 'react';
import axios from "axios";
import './Card.css';

export default class Card extends Component {
    constructor() {
        super()
        this.state ={ card: null}
    }

    generateImageNumber() {
        let imgNumber = Math.floor(Math.random() * 61) + 1;
        return imgNumber;
    }
    componentWillMount() {   
        axios.get("https://api.guildwars2.com/v2/pets/" + this.generateImageNumber())
        .then(data => {
            this.setState({
                card: data.data.icon
            })
        })   
    }
    
    render() {
        return(
            <div className="card">
                <div className="cardImage" style={{backgroundImage: `url(${this.state.card})`}}>
                <div className="numbers">
                    <div>1</div>
                    <div>2 3</div>
                    <div>4</div>
                </div>
                </div>
            </div>
        
        )
    }
}

