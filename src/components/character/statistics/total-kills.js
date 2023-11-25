import React from 'react'
import { Tooltip } from 'react-mdl'

export default class TotalKills extends React.Component {

    state = {
        total_kills: 0,
        total_unique_kills: 0,
        total_champ_kills: 0
    }

    constructor(props) {
        super(props);

        this.state = {
            total_kills: props.total_kills,
            total_unique_kills: props.total_unique_kills,
            total_champ_kills: props.total_champ_kills,
        };
    }

    render() {
        return (
            <div className="total-kills">
                <ul>
                    <li>
                        <Tooltip position="top" label={<div><h3>Kills</h3></div>}>
                        <h3 className="total-list">{this.state.total_kills.toLocaleString('en-US')}</h3>    
                        </Tooltip>
                        </li>
                    <li>
                    <Tooltip position="top" label={<div><h3>Elite kills</h3></div>}>
                        <h3 className="unique-list">{this.state.total_unique_kills.toLocaleString('en-US')}</h3>
                        </Tooltip>
                        </li>
                    <li>
                    <Tooltip position="top" label={<div><h3>Champion kills</h3></div>}>
                        <h3 className="champ-list">{this.state.total_champ_kills.toLocaleString('en-US')}</h3>
                        </Tooltip>
                        </li>
                </ul>
            </div>
        );
    }
};
