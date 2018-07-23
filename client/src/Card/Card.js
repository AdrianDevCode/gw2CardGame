import React, {Component} from 'react';
import './Card.css';

export default class Card extends Component {
    render() {
        return(
            <div className='card'>
                <div className="numbers">
                    <div>1</div>
                    <div>2 3</div>
                    <div>4</div>
                </div>
            </div>
        )
    }
}
