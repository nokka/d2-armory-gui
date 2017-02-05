import React from 'react'
import { Cell } from 'react-mdl'
import './style.css'

export default class Skills extends React.Component {

    state = {
        attributes: null
    }

    constructor(props) {
        super(props);

        this.state = {
            skills: props.data
        };
    }

    render() {

        console.log(this.state.skills);
        
        return (
            <Cell className="skills" col={8} phone={12}>
                <h3>Skills</h3>
            </Cell>
        );
    }
};
