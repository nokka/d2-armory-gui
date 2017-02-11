import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

import Item from '../item'

export default class EquippedItems extends React.Component {

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
            <Cell col={6} tablet={12} phone={12}>
                <div className="equipped-items">
                { this.state.items.map((item) =>
                    <Item key={(item.id)} data={item} />
                )}
                </div>
            </Cell>
        );
    }
};
