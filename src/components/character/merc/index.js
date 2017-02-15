import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

// Components.
import Item from '../item'
import Calculator from '../bonus-calculator'

export default class MercItems extends React.Component {

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
            mf: 0
        };

        if(props.data.length > 0) {
            props.data.map(function(item) {
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
                return true;
            });
        }

        this.state = {
            items: props.data,
            bonuses: bonuses
        };
    }

    render() {
        return (
            <Cell className="merc-inner" col={12}>
                <div className="merc-bonuses">
                    <h3 className="underlined">Gear bonuses</h3>
                    <ul>
                    { (this.state.bonuses.fcr > 0) ?
                        <li>Faster cast rate: <span className="bonus-value">{this.state.bonuses.fcr}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.fhr > 0) ?
                        <li>Faster hit recovery: <span className="bonus-value">{this.state.bonuses.fhr}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.ias > 0) ?
                        <li>Increased attack speed: <span className="bonus-value">{this.state.bonuses.ias}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.frw > 0) ?
                        <li>Faster run/walk: <span className="bonus-value">{this.state.bonuses.frw}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.dr > 0) ?
                        <li>Damage reduction: <span className="bonus-value">{this.state.bonuses.dr}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.mf > 0) ?
                        <li>Better chance of getting magic items: <span className="bonus-value">{this.state.bonuses.mf}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.cb > 0) ?
                        <li>Crushing blow: <span className="bonus-value">{this.state.bonuses.cb}%</span></li>
                        :
                        null
                    }
                    { (this.state.bonuses.ds > 0) ?
                        <li>Deadly strike: <span className="bonus-value">{this.state.bonuses.ds}%</span></li>
                        :
                        null
                    }
                    </ul>
                </div>
                <div className="merc-items">
                    <h1 className="char-name">Mercenary</h1>
                    <div className="equipped-items">
                        { this.state.items.map((item) =>
                            <Item key={(item.id)} data={item} />
                        )}
                    </div>
                </div>
            </Cell>
        );
    }
};
