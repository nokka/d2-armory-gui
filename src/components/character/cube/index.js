import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

import Item from '../item'

export default class Cube extends React.Component {

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
            <Cell className="cube-tab" col={6} tablet={12} phone={12}>
                <h3 className="tab-header">Cube</h3>
                <div className="cube-grid">
                    { this.state.items.map((item) =>
                        <Item key={`inv-${item.id}-pos-${item.position_x}-${item.position_y}`} data={item} />
                    )}
                </div>
            </Cell>
        );
    }
};
