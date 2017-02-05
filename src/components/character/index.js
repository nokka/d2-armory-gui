import React from 'react'
import fetch from 'isomorphic-fetch'
import { Grid, Icon, Spinner } from 'react-mdl'

// Components.
import EquippedItems from './equipped-items'
import GearBonuses from './gear-bonuses'
import Attributes from './attributes'
import Skills from './skills'

import './style.css'

export default class Ladder extends React.Component {

    state = {
        header: null,
        attributes: null,
        skills: null,
        items: null,
        merc_items: null,
        lastParsed: null,
        errorOccurred: false
    }

    componentDidMount() {
        document.title = "Character";
        this.loadCharacter();
    }

    loadCharacter() {
      fetch(`http://localhost:8080/retrieving/v1/character?name=${this.props.params.name}`)
        .then((response) => {
            if (response.status >= 400) {
                throw new Error("Something went terribly wrong");
            }
            return response.json();
        })
        .then((response) => {

            if(response.character) {

                let items = {
                    equipped: []
                };

                response.character.d2s.items.map(function(item) {
                    switch(item.location_id) {
                        case 1:
                            return items.equipped.push(item);
                        default:
                            return true;
                    }
                });

                this.setState({
                    header: response.character.d2s.header,
                    attributes: response.character.d2s.attributes,
                    skills: response.character.d2s.skills,
                    items: items,
                    lastParsed: response.character.last_parsed,
                    errorOccurred: false
                });
            }
            else {
                this.setState({
                    characters: {},
                    errorOccurred: false
                });
            }

        })
        .catch((e) => {
            this.setState({
                errorOccurred: true
            });
        });
    }

    render() {

        if(this.state.errorOccurred) {
            return (
                <div className="broadcast">
                    <Icon name="power" />
                    <h1 className="broadcast-text">Something went terribly wrong, please try again.</h1>
                </div>
            );
        }

        if(!this.state.lastParsed) {
            return (
                <div className="broadcast">
                    <Spinner />
                    <h1 className="broadcast-text">Distorting the space time continuum.</h1>
                </div>
            );
        }

        return (
            <Grid className="character-sheet">
                <GearBonuses/>
                <EquippedItems data={this.state.items.equipped}/>
                <Attributes data={this.state.attributes}/>
                <Skills data={this.state.skills}/>
            </Grid>
        );
    }
}
