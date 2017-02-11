import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

// Components.
import Calculator from './bonus-calculator'

export default class GearBonuses extends React.Component {

    state = {
        ias: null,
        fcr: null,
        fhr: null,
        frw: null
    }

    constructor(props) {
        super(props);

        var bonuses = {
            ias: 0,
            fcr: 0,
            fhr: 0,
            frw: 0
        };

        if(props.data.length > 0) {
            props.data.map(function(item) {
                Calculator.calculate(bonuses, item);
            });
        }

        /*this.state = {
            items: props.data
        };*/
    }

    render() {
        return (
            <Cell className="gear-bonuses" col={6} tablet={12} phone={12}>
                <h3>Gear bonuses</h3>
            </Cell>
        );
    }
};
