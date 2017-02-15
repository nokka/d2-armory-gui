import React from 'react'
import './style.css'

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        window.location.href = `character/${this.state.name}`;
    }

    render() {
        return <div className="home">
            <h1>The armory</h1>
            <p>This is where you can search all the Slash characters and get a detailed view of their skills, items, stats and mercenary.</p>
            <div className="searcher">
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange} />
                <button className="mdl-button mdl-button--raised mdl-button--colored" type="submit">Show me the magic</button>
            </form>
            </div>

        </div>
        }
};
