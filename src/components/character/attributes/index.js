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

        const resistanceCap = 75;
        const hellExpansionPenalty = 100;
        const hellClassicPenalty = 50;
        const scrollOfResistance = 10;

        var extraAttributes = {
                strength: 0,
                energy: 0,
                dexterity: 0,
                vitality: 0,
                max_hp: 0,
                max_mana: 0,
                fire_res: 0,
                cold_res: 0,
                light_res: 0,
                poison_res: 0,
                max_fire_res: 0,
                max_cold_res: 0,
                max_light_res: 0,
                max_poison_res: 0
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

        // Calculate resistances in accordance to Anya quests and difficulty penalties.
        props.data.anya_quests.map(function(q) {
            if(q.consumed_scroll) {
                extraAttributes.fire_res += scrollOfResistance;
                extraAttributes.cold_res += scrollOfResistance;
                extraAttributes.light_res += scrollOfResistance;
                extraAttributes.poison_res += scrollOfResistance;
            }
            return true;
        });

        // Make sure we reduce the correct amount of resistances for hell.
        var penalty = hellClassicPenalty;
        if(props.data.expansion === true) {
            penalty = hellExpansionPenalty;
        }

        extraAttributes.fire_res -= penalty;
        extraAttributes.cold_res -= penalty;
        extraAttributes.light_res -= penalty;
        extraAttributes.poison_res -= penalty;

        this.state = {
            attributes: props.data.attributes,
            fire_res: extraAttributes.fire_res,
            cold_res: extraAttributes.cold_res,
            light_res: extraAttributes.light_res,
            poison_res: extraAttributes.poison_res,
            max_fire_res: resistanceCap+extraAttributes.max_fire_res,
            max_cold_res:resistanceCap+extraAttributes.max_cold_res,
            max_light_res: resistanceCap+extraAttributes.max_light_res,
            max_poison_res: resistanceCap+extraAttributes.max_poison_res,
        };
    }

    toLocaleString(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    render() {
        return (
            <Cell className="attributes" col={4} tablet={12} phone={12}>
                <h3 className="underlined">Attributes</h3>
                <ul className="resources globes">
                    <li>
                        <div className="health globe"><span>{this.state.attributes.max_hp}</span></div>
                        <span className="resource-label">Life</span>
                    </li>
                    <li>
                        <div className="mana globe"><span>{this.state.attributes.max_mana}</span></div>
                        <span className="resource-label">Mana</span>
                    </li>
                </ul>
                <h4 className="underlined">Hell resistances</h4>
                <ul className="attribute-list">
                    <li>
                        <span className="attribute-label">Fire Resistance</span>
                        <span className="attribute-value">
                            <small className="fire-res">{this.state.fire_res}</small>
                            <small>/{this.state.max_fire_res}</small>
                        </span>
                    </li>
                    <li>
                        <span className="attribute-label">Cold Resistance</span>
                        <span className="attribute-value">
                            <small className="cold-res">{this.state.cold_res}</small>
                            <small>/{this.state.max_cold_res}</small>
                        </span>
                    </li>
                    <li>
                        <span className="attribute-label">Lightning Resistance</span>
                        <span className="attribute-value">
                            <small className="light-res">{this.state.light_res}</small>
                            <small>/{this.state.max_light_res}</small>
                        </span>
                    </li>
                    <li>
                        <span className="attribute-label">Poison Resistance</span>
                        <span className="attribute-value">
                            <small className="poison-res">{this.state.poison_res}</small>
                            <small>/{this.state.max_poison_res}</small>
                        </span>
                    </li>
                </ul>
                <h4 className="underlined">Core attributes</h4>
                <ul className="attribute-list">
                    <li><span className="attribute-label">Strength</span><span className="attribute-value">{this.state.attributes.strength}</span></li>
                    <li><span className="attribute-label">Dexterity</span><span className="attribute-value">{this.state.attributes.dexterity}</span></li>
                    <li><span className="attribute-label">Vitality</span><span className="attribute-value">{this.state.attributes.vitality}</span></li>
                    <li><span className="attribute-label">Energy</span><span className="attribute-value">{this.state.attributes.energy}</span></li>
                </ul>
                <h4 className="underlined">Other</h4>
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
