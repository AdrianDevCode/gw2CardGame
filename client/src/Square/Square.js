import React, {Component} from 'react';
import './Square.css';

export default class Square extends Component {
    render() {
    
        return(
            <div className="square">    
                {this.props.children}     
            </div>
        )
    }
}
/* 
 <div className="squaresGrid">
                <div className="squares">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
                <div className="squares">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
                <div className="squares">
                    <div className="square"></div>
                    <div className="square"></div>
                    <div className="square"></div>
                </div>
                
            </div>
*/