import React from 'react'
import { Cell, Tabs, Tab } from 'react-mdl'
import './style.css'

import Item from '../item'

export default class EquippedItems extends React.Component {

    state = {
        items: null,
        swap: 0
    }

    constructor(props) {
        super(props);

        this.state = {
            items: props.data,
            swap: 0
        };
    }

    render() {
        return (
            <Cell className="equipped-tab" col={6} tablet={12} phone={12}>
                <div className={`equipped-items swap-index-${this.state.swap}`}>
                <Tabs className="left-swap swap-tab" activeTab={this.state.swap} onChange={(tabId) => this.setState({ swap: tabId })} ripple>
                    <Tab>i</Tab>
                    <Tab>ii</Tab>
                </Tabs>
                <Tabs className="right-swap swap-tab" activeTab={this.state.swap} onChange={(tabId) => this.setState({ swap: tabId })} ripple>
                    <Tab>i</Tab>
                    <Tab>ii</Tab>
                </Tabs>
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
