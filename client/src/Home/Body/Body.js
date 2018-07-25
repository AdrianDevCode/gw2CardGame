import React, {Component} from 'react';
import './Body.css';

export default class HomePage extends Component {
    render(){
        return(
            <div className='home'>
               {this.props.children}
            </div>
        )
    }
}