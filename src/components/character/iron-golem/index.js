import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

// Components.
import Item from '../item'
import Calculator from 'APP/lib/bonus-calculator';

export default class IronGolem extends React.Component {

    state = {
        items: null
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

        if(props.data.magic_attributes !== null) {
            Calculator.calculate(bonuses, props.data.magic_attributes);
        }

        if(props.data.runeword_attributes !== null) {
            Calculator.calculate(bonuses, props.data.runeword_attributes);
        }

        if(props.data.socketed_items !== null) {
            for(var i = 0; i < props.data.socketed_items.length; i++) {
                Calculator.calculate(bonuses, props.data.socketed_items[i].magic_attributes);
            }
        }

        this.state = {
            item: props.data,
            bonuses: bonuses
        };
    }

    render() {
        return (
            <Cell className="golem-inner" col={12}>
                <div className="golem-bonuses">
                    <h3 className="underlined">Key bonuses</h3>
                    <ul>
                    { (this.state.bonuses.fcr > 0) ?
                        <li className="fcr">Faster cast rate: <span className="bonus-value">{this.state.bonuses.fcr}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.fhr > 0) ?
                        <li className="fhr">Faster hit recovery: <span className="bonus-value">{this.state.bonuses.fhr}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.ias > 0) ?
                        <li  className="ias">Increased attack speed: <span className="bonus-value">{this.state.bonuses.ias}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.frw > 0) ?
                        <li className="frw">Faster run/walk: <span className="bonus-value">{this.state.bonuses.frw}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.dr > 0) ?
                        <li className="dr">Damage reduction: <span className="bonus-value">{this.state.bonuses.dr}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.mf > 0) ?
                        <li className="mf">Better chance of getting magic items: <span className="bonus-value">{this.state.bonuses.mf}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.cb > 0) ?
                        <li className="cb">Crushing blow: <span className="bonus-value">{this.state.bonuses.cb}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.ds > 0) ?
                        <li className="ds">Deadly strike: <span className="bonus-value">{this.state.bonuses.ds}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.auras.length > 0) ?
                        this.state.bonuses.auras.map((aura) =>
                            <li key={`merc-aura-${aura.name}`} className="aura">Level {aura.level} {aura.name} Aura When Equipped</li>
                        )
                        :
                        null
                    }
                    </ul>
                </div>
                <div className="golem-items">
                    <h1 className="char-name">Iron Golem</h1>
                    <div className="equipped-items">
                        <Item key={(this.state.item.id)} data={this.state.item} />
                        <div className={`item-backdrop location-${this.state.item.equipped_id}`}></div>
                    </div>
                </div>
            </Cell>
        );
    }
};
