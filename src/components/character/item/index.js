import React from 'react'
import { Tooltip } from 'react-mdl'
import './style.css'

import MagicAttribute from './magic-attribute'
import SocketedItem from './socketed-item'

const quality = {
    lowQuality: 1,
    normal: 2,
    highQuality: 3,
    magicallyEnhanced: 4,
    set: 5,
    rare: 6,
    unique: 7,
    crafted: 8
};

export default class Item extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            item: props.data
        };
    }

    getTitle() {
        let prefix = null;

        let magic_prefix = null;
        let magic_suffix = null;

        let prefixClass = null;

        switch (this.state.item.quality) {
            case quality.magicallyEnhanced:
                magic_prefix = this.state.item.magic_prefix;
                magic_suffix = this.state.item.magic_suffix;
                break;
            case quality.set:
                prefix = this.state.item.set_name;
                break;
            case quality.unique:
                prefix = this.state.item.unique_name;
                break;
            default:
                break;
        }

        if(this.state.item.given_runeword === 1) {
            prefix = this.state.item.runeword_name;
            prefixClass = "runeword";
        }
        else {
            prefixClass = this.state.item.quality;
        }

        return (
            <div>
                <h3 className={`type-${prefixClass}`}>{prefix}</h3>

                { (this.state.item.quality === quality.magicallyEnhanced) ?
                    <h3 className={`type-${this.state.item.quality}`}>{magic_prefix} {this.state.item.type_name} of {magic_suffix}</h3>
                    :
                    <h3 className={`type-${this.state.item.quality}`}>{this.state.item.type_name}</h3>
                }
            </div>
        );
    }

    getStandardAttributes() {
        var defense = null;
        if(this.state.item.hasOwnProperty("defense_rating")) {
            defense = `Defense: ${this.state.item.defense_rating}`;
        }

        var durability = null;
        if(this.state.item.hasOwnProperty("current_durability")) {
            durability = `Durability: ${this.state.item.current_durability} of ${this.state.item.max_durability}`;
        }

        var quantity = null;
        if(this.state.item.hasOwnProperty("quantity")) {
            durability = `Quantity: ${this.state.item.quantity}`;
        }

        return (
            <div>
                <p>{defense}</p>
                <p>{durability}</p>
                <p>{quantity}</p>
            </div>
        );
    }

    getNrOfSockets() {
        var socketed = null;
        if(this.state.item.socketed === 1) {
            socketed = `Socketed (${this.state.item.nr_of_items_in_sockets})`;
        }

        return (
            <div>
                <p className="magic-property">{socketed}</p>
            </div>
        );
    }

    getItemImage() {
        var itemImage = null;
        if(this.state.item.multiple_pictures === 1) {
            itemImage = this.state.item.type + "_" + this.state.item.picture_id;
        } else {
            itemImage = this.state.item.type;
        }

        return itemImage;
    }

    renderTooltip() {

        var title = this.getTitle();
        var standardAttributes = this.getStandardAttributes();
        var nrOfSockets = this.getNrOfSockets();

        return (
            <div>
                {title}
                {standardAttributes}

                { (this.state.item.magic_attributes !== null) ?
                    this.state.item.magic_attributes.map((props) =>
                        <MagicAttribute key={`${this.state.item.id}-magic-${props.id}`} data={props}/>
                    )
                    :
                    null
                }

                { (this.state.item.runeword_attributes !== null) ?
                    this.state.item.runeword_attributes.map((props) =>
                        <MagicAttribute key={`${this.state.item.id}-runeword-${props.id}`} data={props}/>
                    )
                    :
                    null
                }

                {nrOfSockets}
            </div>
        );
    }

    render() {
        let item = this.state.item;
        let tooltip = this.renderTooltip();


        let equippedName = null;
        // If the item is equipped, we'll add the id to the class names.
        if(item.location_id === 1) {
            equippedName = `location-${item.equipped_id}`;
        }

        let itemImage = this.getItemImage();

        return (
            <Tooltip position="left" className="item-tooltip" label={tooltip}>
                <div className={`item ${equippedName} quality-${item.quality}`}>
                    <span className="helper"></span>
                    <div className="item-image">
                        <img src={`${process.env.PUBLIC_URL}/assets/items/${itemImage}.gif`} role="presentation"/>

                        { (item.nr_of_items_in_sockets > 0) ?
                                <div className={`socketed-items sockets-${item.nr_of_items_in_sockets}`}>
                                {item.socketed_items.map((socketedItem, i) =>
                                    <SocketedItem key={`${item.id}_${i}}`} data={socketedItem}/>
                                )}
                                </div>
                            :
                            null
                        }

                    </div>
                </div>
            </Tooltip>
        );
    }
};
