import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

export default class GearBonuses extends React.Component {

    state = {
        items: null
    }

    constructor(props) {
        super(props);

        this.state = {
            items: props.data
        };
    }

    render() {
        return (
            <Cell className="gear-bonuses" col={6} phone={12}>
                <h3>Gear bonuses</h3>
            </Cell>
        );
    }
};
