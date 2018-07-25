import React, {Component} from 'react';
import Card from "../../Game/Card/Card";
import Nav from "../Nav/Nav";
import Dragula from 'react-dragula';
import './Body.css';

export default class HomePage extends Component {
    render(){
        return(
            <div>
                <div>
                    <Nav />
               </div>
               <div className="cards" ref={this.dragulaDecorator}>
                    <Card className="card"/>
                    <Card className="card"/>
                    <Card className="card"/>
                    <Card className="card"/>
                    <Card className="card"/>
                    <Card className="card"/>
                    <Card className="card"/>
                    <Card className="card"/>
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