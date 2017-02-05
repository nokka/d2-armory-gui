import React from 'react'
import './style.css'

export default class MagicAttribute extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            property: props.data
        };
    }

    renderValues() {
        let rendered = this.state.property.name;
        this.state.property.values.map(function(value, i) {
            return rendered = rendered.replace(`{${i}}`, value);
        });

        return (
            <p className="magic-property">{rendered}</p>
        );
    }

    render() {
        return (
            <div>{this.renderValues()}</div>
        );
    }
};
