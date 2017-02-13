import React from 'react'
import fetch from 'isomorphic-fetch'
import { Grid, Icon, Spinner, Cell } from 'react-mdl'

// Constants.
import Locations from './item-locations'

// Components.
import EquippedItems from './equipped-items'
import Merc from './merc'
import IronGolem from './iron-golem'
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
        golem_item: null,
        is_dead: null,
        last_parsed: null,
        error_occurred: false
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
                    equipped: [],
                    belt: [],
                    inventory: [],
                    stash: [],
                    cube: []
                };

                response.character.d2s.items.map(function(item) {
                    // First lets check if it's equipped, then it'll have
                    // the location_id set.

                    switch(item.location_id) {
                        case Locations.character.equipped:
                            return items.equipped.push(item);

                        case Locations.character.belt:
                            return items.belt.push(item);

                        default:
                            break;
                    }

                    // Looks like the item isn't equipped, so it has to be stored
                    // in cube, stash or inventory.
                    switch(item.alt_position_id) {
                        case Locations.stored.inventory:
                            return items.inventory.push(item);

                        case Locations.stored.cube:
                            return items.cube.push(item);

                        case Locations.stored.stash:
                            return items.stash.push(item);

                        default:
                            break;
                    }

                    return true;
                });



                // When you include a script in the HTML file that defines
                // global variables and try to use one of these variables in the code,
                // the linter will complain because it cannot see the definition of the variable.
                // You can avoid this by reading the global variable explicitly
                // from the window object, we'll do this here because we'll need
                // the character level way down the view hierarchy.
                window.char_level = response.character.d2s.header.level;

                this.setState({
                    header: response.character.d2s.header,
                    attributes: response.character.d2s.attributes,
                    skills: response.character.d2s.skills,
                    items: items,
                    merc_items: response.character.d2s.merc_items,
                    golem_item: response.character.d2s.golem_item,
                    is_dead: response.character.d2s.is_dead,
                    last_parsed: response.character.last_parsed,
                    error_occurred: false
                });
            }
            else {
                this.setState({
                    error_occurred: false
                });
            }

        })
        .catch((e) => {
            this.setState({
                error_occurred: true
            });
        });
    }

    render() {

        if(this.state.error_occurred) {
            return (
                <div className="broadcast">
                    <Icon name="power" />
                    <h1 className="broadcast-text">Something went terribly wrong, please try again.</h1>
                </div>
            );
        }

        if(!this.state.last_parsed) {
            return (
                <div className="broadcast">
                    <Spinner />
                    <h1 className="broadcast-text">Distorting the space time continuum.</h1>
                </div>
            );
        }

        if(this.state.is_dead === 1) {
            return (
                <div className="broadcast">
                    <h1 className="broadcast-text">Dead af.</h1>
                </div>
            );
        }

        return (
            <Grid className="character-sheet">
                <Cell col={6} tablet={12} phone={12}>
                    &nbsp;
                </Cell>
                <Cell col={6} tablet={12} phone={12}>
                    <h2 className="char-class">{this.state.header.level} {this.state.header.class}</h2>
                    <h1 className="char-name">{this.state.header.name}</h1>
                </Cell>
                <GearBonuses data={{equipped: this.state.items.equipped, inventory: this.state.items.inventory}}/>
                <EquippedItems data={this.state.items.equipped}/>
                <Attributes data={{class: this.state.header.class, attributes: this.state.attributes, equipped: this.state.items.equipped, inventory: this.state.items.inventory}}/>
                <Skills data={this.state.skills}/>
                <Merc data={this.state.merc_items}/>
                <IronGolem data={this.state.golem_item}/>
            </Grid>
        );
    }
}
