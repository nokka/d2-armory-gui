import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

import Calculator from 'APP/lib/attributes-calculator';

export default class Attributes extends React.Component {

    state = {
        attributes: null
    }

    constructor(props) {
        super(props);

        var extraAttributes = {
                strength: 0,
                energy: 0,
                dexterity: 0,
                vitality: 0,
                max_hp: 0,
                max_mana: 0
        };

        if(props.data.equipped.length > 0) {
            // Ignoring swap weapons by only counting items with equipped id
            // below or equal to 10.
            props.data.equipped
              .filter((item) => item.equipped_id <= 10)
              .forEach((item) => Calculator.calculateItem(item, extraAttributes));
        }

        if(props.data.inventory.length > 0) {
            props.data.inventory.map(function(item) {
                // Ok, let's make sure we only count charms.
                if(item.type === "cm1" || item.type === "cm2" || item.type === "cm3") {
                    Calculator.calculate(extraAttributes, item.magic_attributes);
                }
                return true;
            });
        }

        // Ok so we got the extra attributes, if vitality or energy is added
        // we'll count it onto the hp and mana attributes.
        if(extraAttributes.vitality > 0) {
            props.data.attributes.max_hp += Calculator.lifePerVitality[props.data.class]*extraAttributes.vitality;
        }

        if(extraAttributes.energy > 0) {
            props.data.attributes.max_mana += Calculator.manaPerEnergy[props.data.class]*extraAttributes.energy;
        }

        if(extraAttributes.max_hp > 0) {
            props.data.attributes.max_hp += extraAttributes.max_hp;
        }

        if(extraAttributes.max_mana > 0) {
            props.data.attributes.max_mana += extraAttributes.max_mana;
        }

        // Add it up.
        props.data.attributes.strength += extraAttributes.strength;
        props.data.attributes.energy += extraAttributes.energy;
        props.data.attributes.dexterity += extraAttributes.dexterity;
        props.data.attributes.vitality += extraAttributes.vitality;

        this.state = {
            attributes: props.data.attributes
        };
    }

    toLocaleString(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        return (
            <Cell className="attributes" col={4} tablet={12} phone={12}>
                <h3 className="underlined">Attributes</h3>
                <ul className="resources">
                    <li>
                        <div className="health globe"><span>{this.state.attributes.max_hp}</span></div>
                        <span className="resource-label">Life</span>
                    </li>
                    <li>
                        <div className="mana globe"><span>{this.state.attributes.max_mana}</span></div>
                        <span className="resource-label">Mana</span>
                    </li>
                </ul>
                <ul className="attribute-list">
                    <li><span className="attribute-label">Strength</span><span className="attribute-value">{this.state.attributes.strength}</span></li>
                    <li><span className="attribute-label">Dexterity</span><span className="attribute-value">{this.state.attributes.dexterity}</span></li>
                    <li><span className="attribute-label">Vitality</span><span className="attribute-value">{this.state.attributes.vitality}</span></li>
                    <li><span className="attribute-label">Energy</span><span className="attribute-value">{this.state.attributes.energy}</span></li>
                </ul>
                <ul className="attribute-list">
                    <li><span className="attribute-label">Experience</span><span className="attribute-value">{this.toLocaleString(this.state.attributes.experience)}</span></li>
                    <li><span className="attribute-label">Gold</span><span className="attribute-value">{this.toLocaleString(this.state.attributes.gold)}</span></li>
                    <li><span className="attribute-label">Stashed gold</span><span className="attribute-value">{this.toLocaleString(this.state.attributes.stashed_gold)}</span></li>
                    <li><span className="attribute-label">Unused skill points</span><span className="attribute-value">{this.state.attributes.unused_skill_points}</span></li>
                    <li><span className="attribute-label">Unused attributes</span><span className="attribute-value">{this.state.attributes.unused_stats}</span></li>
                </ul>
            </Cell>
        );
    }
};
