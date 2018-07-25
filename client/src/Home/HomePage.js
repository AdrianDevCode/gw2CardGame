import React, {Component} from 'react';
import Nav from './Nav/Nav';
import Body from './Body/Body';

export default class HomePage extends Component {
    render(){
        return(
            <div>
                <Body ><Nav /></Body>
            </div>
        )
    }
}