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
            <Cell className="equipped-tab" col={6} tablet={12} phone={12}>
                <div className="equipped-items">
                { this.state.items.map((item) =>
                    <Item key={(item.id)} data={item} />
                )}
                <div className="item-backdrop location-1"></div>
                <div className="item-backdrop location-2"></div>
                <div className="item-backdrop location-3"></div>
                <div className="item-backdrop location-4"></div>
                <div className="item-backdrop location-5"></div>
                <div className="item-backdrop location-6"></div>
                <div className="item-backdrop location-7"></div>
                <div className="item-backdrop location-8"></div>
                <div className="item-backdrop location-9"></div>
                <div className="item-backdrop location-10"></div>
                <div className="item-backdrop location-11"></div>
                <div className="item-backdrop location-12"></div>
                </div>
            </Cell>
        );
    }
};
