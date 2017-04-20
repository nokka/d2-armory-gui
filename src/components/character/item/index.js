import React from 'react'
import { Tooltip } from 'react-mdl'
import './style.css'

// Constants.
import Quality from './quality'
import RuneNames from './rune-names'

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
                if(this.state.item.magic_prefix > 0) {
                    magic_prefix = this.state.item.magic_prefix_name;
                }
                if(this.state.item.magic_suffix > 0) {
                    magic_suffix = this.state.item.magic_suffix_name;
                }
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
                    <h3 className={`type-${this.state.item.quality}`}>
                        {this.state.item.magic_prefix > 0 && `${magic_prefix} `}
                        {this.state.item.type_name}
                        {this.state.item.magic_suffix > 0 && ` of ${magic_suffix}`}
                    </h3>
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

        // This is one mother fucker of a problem, if we don't dereference the item
        // by making it into a string, and then parsing it back into an object,
        // the merger will mutate the original items magic attributes, due to javascript
        // sending everything as a reference, no matter how many times we clone it or
        // assign it to another variable, javascript will still have a pointer to it,
        // and mutate it, thus ruining our lives.

        var clone = (JSON.parse(JSON.stringify(this.state.item)));

        if(clone.magic_attributes !== null) {
            Merger.merge(attributes, clone.magic_attributes);
        }

        if(clone.runeword_attributes !== null) {
            Merger.merge(attributes, clone.runeword_attributes);
        }

        if(clone.socketed_items !== null) {
            for(var i = 0; i < clone.socketed_items.length; i++) {
                Merger.merge(attributes, clone.socketed_items[i].magic_attributes);
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

    /*getSetAttributes() {

        if(this.state.item.set_attributes.length === 0) {
            return null;
        }

        var attributes = [];
        if(this.state.item.set_attributes.length > 0) {
            this.state.item.set_attributes.map(function(list, i){
                list.map(function(props, i){
                    return attributes.push(props);
                });
                return true;
            });
        }

        return (
            <div>
            { (attributes.length > 0) ?
                attributes.map((props, i) =>
                    <div key={`${this.state.item.id}-set-wrap-${props.id}-${i}`} className="set-property">
                        <MagicAttribute key={`${this.state.item.id}-set-${props.id}-${i}`} data={props}/>
                    </div>
                )
                :
                null
            }
            </div>
        );
    }*/

    getNrOfSockets() {
        var socketed = null;
        if(this.state.item.socketed === 1) {
            socketed = `Socketed (${this.state.item.total_nr_of_sockets})`;
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

    getUnidentified() {
        var unid = null;

        if(this.state.item.identified === 0) {
            unid = "(Unidentified)";
        }

        return (
            <div>
                <p className="unidentified">{unid}</p>
            </div>
        );
    }

    getItemImage() {
        var itemImage = null;
        if(this.state.item.multiple_pictures === 1) {

            // If it's annihilus or hellfire torch, we'll display their images instead.
            if(this.state.item.quality === Quality.unique && (this.state.item.type === "cm1" || this.state.item.type === "cm2")) {
                itemImage = `u${this.state.item.unique_id}`;
            }
            else {
                itemImage = this.state.item.type + "_" + this.state.item.picture_id;
            }

        } else {
            if(this.state.item.quality === Quality.unique) {
                itemImage = `u${this.state.item.unique_id}`;
            }
            else if(this.state.item.quality === Quality.set) {
                itemImage = `s${this.state.item.set_id}`;
            }
            else {
                itemImage = this.state.item.type;
            }
        }

        return itemImage;
    }

    getRuneNames() {
        var names = "";
        if(this.state.item.nr_of_items_in_sockets > 0) {
            this.state.item.socketed_items.map(function(item) {
                var match = item.type.match(/r[0-9]/g);
                if(match !== null) {
                    names += RuneNames[item.type];
                }
                return true;
            });
        }

        if(names.length > 0) {
            return (
                <h3 className="type-runeword">{names}</h3>
            );
        }

        return null;
    }

    renderTooltip() {

        var title = this.getTitle();
        var runeNames = this.getRuneNames();
        var standardAttributes = this.getStandardAttributes();
        var magicAttributes = this.getMagicAttributes();
        //var setAttributes = this.getSetAttributes();
        var nrOfSockets = this.getNrOfSockets();
        var ethereal = this.getEthereal();
        var isUnidentified = this.getUnidentified();

        return (
            <div>
                {title}
                {runeNames}
                {standardAttributes}
                {magicAttributes}
                {nrOfSockets}
                {ethereal}
                {isUnidentified}
            </div>
        );
    }

    render() {
        let item = this.state.item;
        let tooltip = this.renderTooltip();

        let locationClass = "";
        // If the item is equipped, we'll add the id to the class names.
        if(item.location_id === 1) {
            locationClass = `location-${item.equipped_id}`;
        }
        else {
            locationClass = 'inv-item';
        }

        let itemImage = this.getItemImage();

        return (
            <Tooltip position="left" className="item-tooltip" label={tooltip}>
                <div className={`item ${locationClass} quality-${item.quality} pos-x-${item.position_x} pos-y-${item.position_y}`}>
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
