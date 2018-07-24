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