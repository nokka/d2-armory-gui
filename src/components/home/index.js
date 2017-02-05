import React from 'react'
import { Textfield, Button } from 'react-mdl'
import './style.css'

export default React.createClass({
  render() {
    return <div className="home">
        <Textfield
            onChange={() => {}}
            onFocus={() => {}}
            label="Expandable Input"
            expandable
            value="Character name"
            expandableIcon="search"
        />
        <Button raised colored>Show me the magic</Button>
    </div>
  }
});
