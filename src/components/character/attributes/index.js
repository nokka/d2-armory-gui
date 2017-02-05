import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

export default class Attributes extends React.Component {

    state = {
        attributes: null
    }

    constructor(props) {
        super(props);

        this.state = {
            attributes: props.data
        };
    }

    render() {
        return (
            <Cell className="attributes" col={4} phone={12}>
                <h3>Attributes</h3>
                <ul>
                    <li><span className="attribute-label">Strength</span><span className="attribute-value">{this.state.attributes.strength}</span></li>
                    <li><span className="attribute-label">Dexterity</span><span className="attribute-value">{this.state.attributes.dexterity}</span></li>
                    <li><span className="attribute-label">Vitality</span><span className="attribute-value">{this.state.attributes.vitality}</span></li>
                    <li><span className="attribute-label">Energy</span><span className="attribute-value">{this.state.attributes.energy}</span></li>
                </ul>
                <ul>
                    <li><span className="attribute-label">Experience</span><span className="attribute-value">{this.state.attributes.experience}</span></li>
                    <li><span className="attribute-label">Gold</span><span className="attribute-value">{this.state.attributes.gold}</span></li>
                    <li><span className="attribute-label">Stashed gold</span><span className="attribute-value">{this.state.attributes.stashed_gold}</span></li>
                    <li><span className="attribute-label">Unused skill points</span><span className="attribute-value">{this.state.attributes.unused_skill_points}</span></li>
                    <li><span className="attribute-label">Unused attributes</span><span className="attribute-value">{this.state.attributes.unused_stats}</span></li>
                </ul>
            </Cell>
        );
    }
};
