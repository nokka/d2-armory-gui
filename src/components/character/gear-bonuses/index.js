import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

// Components.
import Calculator from 'APP/lib/bonus-calculator';

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
            mf: 0,
            auras: []
        };

        if (props.data.equipped.length > 0) {
            props.data.equipped.map(function (item) {

                // Ignoring swap weapons by only counting items with equipped id
                // below or equal to 10.
                if (item.equipped_id <= 10) {
                    if (item.magic_attributes !== null) {
                        Calculator.calculate(bonuses, item.magic_attributes);
                    }

                    if (item.runeword_attributes !== null) {
                        Calculator.calculate(bonuses, item.runeword_attributes);
                    }

                    if (item.socketed_items !== null) {
                        for (var i = 0; i < item.socketed_items.length; i++) {
                            Calculator.calculate(bonuses, item.socketed_items[i].magic_attributes);
                        }
                    }
                }
                return true;
            });
        }

        if (props.data.inventory.length > 0) {
            props.data.inventory.map(function (item) {
                // Ok, let's make sure we only count charms.
                if (item.type === "cm1" || item.type === "cm2" || item.type === "cm3") {
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
            <Cell className="gear-bonuses" col={6} tablet={12} phone={12}>
                <h3 className="underlined">Key bonuses</h3>
                <ul>
                    {(this.state.bonuses.fcr > 0) ?
                        <li className="fcr">Faster cast rate: <span className="bonus-value">{this.state.bonuses.fcr}%</span></li>
                        :
                        null
                    }
                    {(this.state.bonuses.fhr > 0) ?
                        <li className="fhr">Faster hit recovery: <span className="bonus-value">{this.state.bonuses.fhr}%</span></li>
                        :
                        null
                    }
                    {(this.state.bonuses.ias > 0) ?
                        <li className="ias">Increased attack speed: <span className="bonus-value">{this.state.bonuses.ias}%</span></li>
                        :
                        null
                    }
                    {(this.state.bonuses.frw > 0) ?
                        <li className="frw">Faster run/walk: <span className="bonus-value">{this.state.bonuses.frw}%</span></li>
                        :
                        null
                    }
                    {(this.state.bonuses.dr > 0) ?
                        <li className="dr">Damage reduced by: <span className="bonus-value">{this.state.bonuses.dr}%</span></li>
                        :
                        null
                    }
                    {(this.state.bonuses.mf > 0) ?
                        <li className="mf">Better chance of getting magic items: <span className="bonus-value">{this.state.bonuses.mf}%</span></li>
                        :
                        null
                    }
                    {(this.state.bonuses.cb > 0) ?
                        <li className="cb">Crushing blow: <span className="bonus-value">{this.state.bonuses.cb}%</span></li>
                        :
                        null
                    }
                    {(this.state.bonuses.ds > 0) ?
                        <li className="ds">Deadly strike: <span className="bonus-value">{this.state.bonuses.ds}%</span></li>
                        :
                        null
                    }
                    {(this.state.bonuses.auras.length > 0) ?
                        this.state.bonuses.auras.map((aura, idx) =>
                            < li key={`equipped-aura-${aura.name}-${idx}`} className="aura">Level {aura.level} {aura.name} Aura When Equipped</li>
                        )
                        :
                        null
                    }
                </ul>
            </Cell >
        );
    }
};
