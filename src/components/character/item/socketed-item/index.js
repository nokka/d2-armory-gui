import React from 'react'
import './style.css'

export default class SocketedItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            item: props.data.item,
            position: props.data.position
        };
    }

    getItemImage() {
        let itemImage = null;
        if(this.state.item.multiple_pictures === 1) {
            itemImage = `${this.state.item.type}_${this.state.item.picture_id}`;
        } else {
            itemImage = this.state.item.type;
        }

        return itemImage;
    }

    render() {
        let itemImage = this.getItemImage();
        return (
            <div className={`socketed-item socketed-position-${this.state.position}`}>
                <img src={`${process.env.PUBLIC_URL}/assets/items/${itemImage}.png`} role="presentation" />
            </div>
        );
    }
};
