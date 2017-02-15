import React from 'react'
import { Tooltip } from 'react-mdl'
import './style.css'

// Constants.
import Quality from './quality'

// Components.
import MagicAttribute from './magic-attribute'
import SocketedItem from './socketed-item'
import Merger from './attribute-merger'

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
            case Quality.magicallyEnhanced:
                magic_prefix = this.state.item.magic_prefix_name;
                magic_suffix = this.state.item.magic_suffix_name;
                break;
            case Quality.set:
                prefix = this.state.item.set_name;
                break;
            case Quality.unique:
                prefix = this.state.item.unique_name;
                break;
            case Quality.rare:
            case Quality.crafted:
                prefix = `${this.state.item.rare_name} ${this.state.item.rare_name2}`;
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
                { (this.state.item.personalized === 1) ?
                    <h3 className={`type-${this.state.item.quality}`}>{this.state.item.personalized_name}'s</h3>
                    :
                    null
                }
                <h3 className={`type-${prefixClass}`}>{prefix}</h3>

                { (this.state.item.quality === Quality.magicallyEnhanced) ?
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

    getMagicAttributes() {

        var attributes = [];

        if(this.state.item.magic_attributes !== null) {
            Merger.merge(attributes, this.state.item.magic_attributes);
        }

        if(this.state.item.runeword_attributes !== null) {
            Merger.merge(attributes, this.state.item.runeword_attributes);
        }

        if(this.state.item.socketed_items !== null) {
            for(var i = 0; i < this.state.item.socketed_items.length; i++) {
                Merger.merge(attributes, this.state.item.socketed_items[i].magic_attributes);
            }
        }

        return (
            <div>
            { (attributes.length > 0) ?
                attributes.map((props, i) =>
                    <MagicAttribute key={`${this.state.item.id}-socketed-${props.id}-${i}`} data={props}/>
                )
                :
                null
            }
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

    getEthereal() {
        var ethereal = null;
        if(this.state.item.ethereal === 1) {
            ethereal = "Ethereal (Cannot be repaired)";
        }

        return (
            <div>
                <p className="magic-property">{ethereal}</p>
            </div>
        );
    }

    getItemImage() {
        var itemImage = null;
        if(this.state.item.multiple_pictures === 1) {
            itemImage = this.state.item.type + "_" + this.state.item.picture_id;
        } else {
            /*if(this.state.item.quality === Quality.unique) {
                itemImage = `${this.state.item.type}_u${this.state.item.unique_id}`;
            }*/

            if(this.state.item.quality === Quality.set) {
                itemImage = `s${this.state.item.set_id}`;
            }
            else {
                itemImage = this.state.item.type;
            }
        }

        return itemImage;
    }

    renderTooltip() {

        var title = this.getTitle();
        var standardAttributes = this.getStandardAttributes();
        var magicAttributes = this.getMagicAttributes();
        var nrOfSockets = this.getNrOfSockets();
        var ethereal = this.getEthereal();

        return (
            <div>
                {title}
                {standardAttributes}
                {magicAttributes}
                {nrOfSockets}
                {ethereal}
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
                    <div className={`item-image`}>
                        <img className={`ethereal-${item.ethereal}`} src={`${process.env.PUBLIC_URL}/assets/items/${itemImage}.png`} role="presentation"/>
                        { (item.nr_of_items_in_sockets > 0) ?
                                <div className={`socketed-items sockets-${item.nr_of_items_in_sockets}`}>
                                {item.socketed_items.map((socketedItem, i) =>
                                    <SocketedItem key={`${item.id}_${i}}`} data={{item: socketedItem, position: i}}/>
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
