import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

import Item from '../item'

export default class IronGolem extends React.Component {

    state = {
        item: null
    }

    constructor(props) {
        super(props);

        this.state = {
            item: props.data
        };
    }

    render() {
        return (
            <Cell col={6} tablet={12} phone={12}>
                <h3>Iron Golem</h3>
                <div className="iron-golem">
                    <Item key={(this.state.item.id)} data={this.state.item} />
                </div>
            </Cell>
        );
    }
};
