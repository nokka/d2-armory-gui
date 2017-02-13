import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

// Components.
import Calculator from './bonus-calculator'

export default class GearBonuses extends React.Component {

    state = {
        bonuses: null
    }

    constructor(props) {
        super(props);

        var bonuses = {
            ias: 0,
            fcr: 0,
            ds: 0,
            cb: 0,
            fhr: 0,
            frw: 0,
            dr: 0,
            mf: 0
        };

        if(props.data.equipped.length > 0) {
            props.data.equipped.map(function(item) {
                // Ignoring swap weapons by only counting items with equipped id
                // below or equal to 10.
                if(item.equipped_id <=  10) {
                    if(item.magic_attributes !== null) {
                        Calculator.calculate(bonuses, item.magic_attributes);
                    }

                    if(item.runeword_attributes !== null) {
                        Calculator.calculate(bonuses, item.runeword_attributes);
                    }

                    if(item.socketed_items !== null) {
                        for(var i = 0; i < item.socketed_items.length; i++) {
                            Calculator.calculate(bonuses, item.socketed_items[i].magic_attributes);
                        }
                    }
                }
                return true;
            });
        }

        if(props.data.inventory.length > 0) {
            props.data.inventory.map(function(item) {
                // Ok, let's make sure we only count charms.
                if(item.type === "cm1" || item.type === "cm2" || item.type === "cm3") {
                    Calculator.calculate(bonuses, item.magic_attributes);
                }
                return true;
            });
        }

        this.state = {
            bonuses: bonuses
        };
    }

    render() {
        return (
            <Cell className="gear-bonuses" col={6} tablet={12} phone={12}>
                <h3>Gear bonuses</h3>
                <ul>
                    { (this.state.bonuses.fcr > 0) ?
                        <li>Faster cast rate: {this.state.bonuses.fcr}%</li>
                        :
                        null
                    }
                    { (this.state.bonuses.fhr > 0) ?
                        <li>Faster hit recovery: {this.state.bonuses.fhr}%</li>
                        :
                        null
                    }
                    { (this.state.bonuses.ias > 0) ?
                        <li>Increased attack speed: {this.state.bonuses.ias}%</li>
                        :
                        null
                    }
                    { (this.state.bonuses.frw > 0) ?
                        <li>Faster run/walk: {this.state.bonuses.frw}%</li>
                        :
                        null
                    }
                    { (this.state.bonuses.dr > 0) ?
                        <li>Damage reduction: {this.state.bonuses.dr}%</li>
                        :
                        null
                    }
                    { (this.state.bonuses.mf > 0) ?
                        <li>Better chance of getting magic items: {this.state.bonuses.mf}%</li>
                        :
                        null
                    }
                    { (this.state.bonuses.cb > 0) ?
                        <li>Crushing blow: {this.state.bonuses.cb}%</li>
                        :
                        null
                    }
                    { (this.state.bonuses.ds > 0) ?
                        <li>Deadly strike: {this.state.bonuses.ds}%</li>
                        :
                        null
                    }
                </ul>
            </Cell>
        );
    }
};
