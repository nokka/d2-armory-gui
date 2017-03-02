import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

import Item from '../item'

export default class Inventory extends React.Component {

    state = {
        items: null,
        loaded: false
    }

    constructor(props) {
        super(props);

        this.state = {
            items: props.data
        };
    }

    render() {
        return (
            <Cell className="inventory-tab" col={6} tablet={12} phone={12}>
                <h3 className="tab-header">Inventory</h3>
                <div className="inv-grid">
                    { this.state.items.map((item) =>
                        <Item key={`inv-${item.id}-pos-${item.position_x}-${item.position_y}`} data={item} />
                    )}
                </div>
            </Cell>
        );
    }
};
