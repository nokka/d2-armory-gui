import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

import Item from '../item'

export default class Inventory extends React.Component {

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
            <Cell className="inventory-tab" col={6} tablet={12} phone={12}>
                <div className="inv-grid">
                    { this.state.items.map((item) =>
                        <div key={`inv-${item.id}-pos-${item.position_x}-${item.position_y}`} className={`inv-item pos-x-${item.position_x} pos-y-${item.position_y}`}>
                            <Item data={item} />
                        </div>
                    )}
                </div>
            </Cell>
        );
    }
};
