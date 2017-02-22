import React from 'react'
import fetch from 'isomorphic-fetch'
import { Grid, Icon, Spinner, Cell, Tabs, Tab } from 'react-mdl'

import { handleItem } from 'APP/lib/utils';

// Components.
import EquippedItems from './equipped-items'
import Inventory from './inventory'
import Merc from './merc'
import IronGolem from './iron-golem'
import GearBonuses from './gear-bonuses'
import Attributes from './attributes'
import Skills from './skills'

import './style.css'

export default class AllocatedSkills extends React.Component {

    state = {
        header: null,
        attributes: null,
        skills: null,
        items: null,
        merc_items: null,
        golem_item: null,
        is_dead: null,
        last_parsed: null,
        error_occurred: false,
        not_found: false,
        active_tab: 0
    }

    componentDidMount() {
        this.loadCharacter();
    }

    loadCharacter() {
        fetch(`https://armory.slashgaming.net/retrieving/v1/character?name=${this.props.params.name}`)
        .then((response) => {
            if (response.status === 404) {
                throw new Error("Not found");
            }
            else if (response.status > 404) {
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

                response.character.d2s.items.forEach((item) => handleItem(item, items));

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
                    error_occurred: true
                });
            }

        })
        .catch((e) => {
            if(e.message === 'Not found') {
                this.setState({
                    not_found: true
                });
            } else {
                this.setState({
                    error_occurred: true
                });
            }
        });
    }

    render() {

        if(this.state.not_found) {
            document.title = "Character not found";
            return (
                <div className="broadcast">
                    <Icon name="power" />
                    <h1 className="broadcast-text">Character unfortunately does not exist, bug Meanski about it.</h1>
                </div>
            );
        }

        if(this.state.error_occurred) {
            document.title = "Parsing error";
            return (
                <div className="broadcast">
                    <Icon name="adb" />
                    <h1 className="broadcast-text">Couldn't parse the character, missing magic attributes probably, developers have been notified.</h1>
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

        document.title = this.state.header.name;

        if(this.state.is_dead === 1) {
            return (
                <div className="broadcast">
                    <h1 className="broadcast-text">Dead af.</h1>
                </div>
            );
        }

        return (
            <div>
                <Grid className="menu-grid">
                    <Cell col={12} tablet={12} phone={12}>
                        <ul className="menu">
                            <li><a title="Checkout the ladder" href="https://ladder.slashgaming.net/exp/overall"><Icon name="timeline" /><span>LADDER</span></a></li>
                            <li><a title="Search the armory" href="/"><Icon name="search" /><span>SEARCH</span></a></li>
                            <li><a title="Slash subreddit" href="https://reddit.com/r/slashdiablo"><Icon name="comment" /><span>REDDIT</span></a></li>
                        </ul>
                        <Tabs className="tabs-menu" activeTab={this.state.active_tab} onChange={(tabId) => this.setState({ active_tab: tabId })} ripple>
                            <Tab>Equipped</Tab>
                            <Tab>Inventory</Tab>
                        </Tabs>
                    </Cell>
                </Grid>
                <Grid className="character-sheet profile-top">
                    <Cell col={6} tablet={12} phone={12}>
                        &nbsp;
                    </Cell>
                    <Cell col={6} tablet={12} phone={12}>
                        <h2 className="char-class">({this.state.header.level}) {this.state.header.class}</h2>
                        <h1 className="char-name">{this.state.header.name}</h1>
                    </Cell>


                    <GearBonuses data={{equipped: this.state.items.equipped, inventory: this.state.items.inventory}}/>

                    {this.state.active_tab === 0 && <EquippedItems data={this.state.items.equipped}/>}
                    {this.state.active_tab === 1 && <Inventory data={this.state.items.inventory}/>}

                </Grid>
                <Grid className="character-sheet profile-low">
                    <Attributes data={{class: this.state.header.class, attributes: this.state.attributes, equipped: this.state.items.equipped, inventory: this.state.items.inventory}}/>
                    <Skills data={this.state.skills}/>
                </Grid>
                {this.state.merc_items !== null && <Grid className="character-sheet merc"><Merc data={this.state.merc_items}/></Grid>}
                {this.state.golem_item !== null && <Grid className="character-sheet iron-golem"><IronGolem data={this.state.golem_item}/></Grid>}
            </div>
        );
    }
}
