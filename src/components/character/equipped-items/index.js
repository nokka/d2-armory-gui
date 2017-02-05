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
            <Cell className="equipped-items" col={6} phone={12}>
                { this.state.items.map((item) =>
                    <Item key={(item.id)} data={item} />
                )}
            </Cell>
        );
    }
};
