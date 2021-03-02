import React from "react";
import fetch from "isomorphic-fetch";
import { Grid, Icon, Spinner, Cell, Tabs, Tab } from "react-mdl";

import { handleItem } from "APP/lib/utils";

// Components.
import EquippedItems from "./equipped-items";
import Inventory from "./inventory";
import Stash from "./stash";
import Cube from "./cube";
import Merc from "./merc";
import IronGolem from "./iron-golem";
import GearBonuses from "./gear-bonuses";
import Attributes from "./attributes";
import Skills from "./skills";
import Statistics from "./statistics";

import "./style.css";

const TabNames = {
  equipped: "#equipped",
  inventory: "#inventory",
  stash: "#stash",
  cube: "#cube",
};

const TabIDs = {
  0: "#equipped",
  1: "#inventory",
  2: "#stash",
  3: "#cube",
};

export default class Character extends React.Component {
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
    active_tab: 0,
    statistics: null
  };

  componentDidMount() {
    var tab = this.props.location.hash;

    var active = 0;
    switch (tab) {
      case TabNames.equipped:
        active = 0;
        break;
      case TabNames.inventory:
        active = 1;
        break;
      case TabNames.stash:
        active = 2;
        break;
      case TabNames.cube:
        active = 3;
        break;
      default:
        active = 0;
        window.location.hash = TabIDs[0];
        break;
    }

    this.setState({ active_tab: active });

    // Load character data.
    this.loadCharacter();

    // Load statistics about the character.
    this.loadStatistics();
  }

  loadStatistics() {
    fetch(
      process.env.API_URL + `/api/v1/statistics?character=${this.props.params.name}`
    )
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Not found");
        } else if (response.status > 404) {
          throw new Error("Something went terribly wrong");
        }
        return response.json();
      })
      .then((response) => {
        this.setState({
          statistics: response
        });
      })
      .catch((e) => {
        if (e.message === "Not found") {
          this.setState({
            statistics_not_found: true,
          });
        } else {
          this.setState({
            statistics_error_occurred: true,
          });
        }
      });
  }

  loadCharacter() {
    fetch(
      process.env.API_URL + `/api/v1/characters?name=${this.props.params.name}`
    )
      .then((response) => {
        if (response.status === 404) {
          throw new Error("Not found");
        } else if (response.status > 404) {
          throw new Error("Something went terribly wrong");
        }
        return response.json();
      })
      .then((response) => {
        if (response.character) {
          let items = {
            equipped: [],
            belt: [],
            inventory: [],
            stash: [],
            cube: [],
          };

          response.character.d2s.items.forEach((item) =>
            handleItem(item, items)
          );

          // When you include a script in the HTML file that defines
          // global variables and try to use one of these variables in the code,
          // the linter will complain because it cannot see the definition of the variable.
          // You can avoid this by reading the global variable explicitly
          // from the window object, we'll do this here because we'll need
          // the character level way down the view hierarchy.
          window.char_level = response.character.d2s.header.level;

          let anyaQuests = [
            response.character.d2s.header.quests_normal.act_v.prison_of_ice,
            response.character.d2s.header.quests_nm.act_v.prison_of_ice,
            response.character.d2s.header.quests_hell.act_v.prison_of_ice,
          ];

          // Make the last played date more readable for every locale.
          var lastPlayedLocale = new Date(
            response.character.d2s.header.last_played * 1000
          ).toLocaleString();

          this.setState({
            header: response.character.d2s.header,
            attributes: response.character.d2s.attributes,
            skills: response.character.d2s.skills,
            items: items,
            merc_items: response.character.d2s.merc_items,
            golem_item: response.character.d2s.golem_item,
            is_dead: response.character.d2s.is_dead,
            last_parsed: response.character.last_parsed,
            anya_quests: anyaQuests,
            error_occurred: false,
            last_played: lastPlayedLocale,
          });
        } else {
          this.setState({
            error_occurred: true,
          });
        }
      })
      .catch((e) => {
        if (e.message === "Not found") {
          this.setState({
            not_found: true,
          });
        } else {
          this.setState({
            error_occurred: true,
          });
        }
      });
  }

  determineTab(tabId) {
    this.setState({ active_tab: tabId });
    window.location.hash = TabIDs[tabId];
  }

  render() {
    if (this.state.not_found) {
      document.title = "Character not found";
      return (
        <div className="broadcast">
          <Icon name="power" />
          <h1 className="broadcast-text">
            Character unfortunately does not exist, bug Meanski about it.
          </h1>
        </div>
      );
    }

    if (this.state.error_occurred) {
      document.title = "Parsing error";
      return (
        <div className="broadcast">
          <Icon name="adb" />
          <h1 className="broadcast-text">
            Couldn't parse the character, missing magic attributes probably,
            developers have been notified.
          </h1>
        </div>
      );
    }

    if (!this.state.last_parsed) {
      return (
        <div className="broadcast">
          <Spinner />
          <h1 className="broadcast-text">
            Distorting the space time continuum.
          </h1>
        </div>
      );
    }

    document.title = this.state.header.name;

    if (this.state.is_dead === 1) {
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
              <li>
                <a
                  title="Checkout the ladder"
                  href="http://ladder.slashdiablo.net/exp/overall"
                >
                  <Icon name="timeline" />
                  <span>LADDER</span>
                </a>
              </li>
              <li>
                <a title="Search the armory" href="/">
                  <Icon name="search" />
                  <span>SEARCH</span>
                </a>
              </li>
              <li>
                <a
                  title="Slash subreddit"
                  href="https://reddit.com/r/slashdiablo"
                >
                  <Icon name="comment" />
                  <span>REDDIT</span>
                </a>
              </li>
            </ul>
            <Tabs
              className="tabs-menu"
              activeTab={this.state.active_tab}
              onChange={(tabId) => this.determineTab(tabId)}
              ripple
            >
              <Tab>
                <span className="visible-desktop">Equipped</span>
                <span className="visible-mobile">
                  <Icon name="person" />
                </span>
              </Tab>
              <Tab>
                <span className="visible-desktop">Inventory</span>
                <span className="visible-mobile">
                  <Icon name="room" />
                </span>
              </Tab>
              <Tab>
                <span className="visible-desktop">Stash</span>
                <span className="visible-mobile">
                  <Icon name="home" />
                </span>
              </Tab>
              <Tab>
                <span className="visible-desktop">Cube</span>
                <span className="visible-mobile">
                  <Icon name="crop_square" />
                </span>
              </Tab>
            </Tabs>
          </Cell>
        </Grid>
        <Grid className="character-sheet profile-top">
          <Cell col={6} tablet={12} phone={12}>
            <div className="last-online">
              <h4>Last online:</h4>
              <p>{this.state.last_played}</p>
            </div>
          </Cell>
          <Cell col={6} tablet={12} phone={12}>
            <h2 className="char-class">
              ({this.state.header.level}) {this.state.header.class}
            </h2>
            <h1 className="char-name">{this.state.header.name}</h1>
            {this.state.header.status.expansion === false && (
              <h1 className="char-name classic">Classic</h1>
            )}
            {this.state.header.status.hardcore === true && (
              <h1 className="char-name hardcore">Hardcore</h1>
            )}
            {this.state.header.status.ladder === true && (
              <h1 className="char-name ladder">Ladder</h1>
            )}
            {this.state.header.status.hardcore === true &&
              this.state.header.status.died === true && (
                <h1 className="char-name hc-dead">Dead</h1>
              )}
          </Cell>

          <GearBonuses
            data={{
              equipped: this.state.items.equipped,
              inventory: this.state.items.inventory,
            }}
          />

          {this.state.active_tab === 0 && (
            <EquippedItems data={this.state.items.equipped} />
          )}
          {this.state.active_tab === 1 && (
            <Inventory data={this.state.items.inventory} />
          )}
          {this.state.active_tab === 2 && (
            <Stash data={this.state.items.stash} />
          )}
          {this.state.active_tab === 3 && <Cube data={this.state.items.cube} />}
        </Grid>
        <Grid className="character-sheet profile-low">

          {this.state.statistics === null &&
            !this.state.statistics_not_found &&
            !this.state.statistics_error_occurred && (
              <div className="stats-msg">
                <Spinner />
                <h4>Loading statistics</h4>
              </div>
            )}

          {this.state.statistics !== null && (
            <Statistics level={this.state.header.level} data={this.state.statistics} />
          )}

          {this.state.statistics_error_occurred && (
            <div className="stats-msg">
              <h4>Failed to load statistics</h4>
            </div>
          )}

          <Attributes
            data={{
              class: this.state.header.class,
              attributes: this.state.attributes,
              equipped: this.state.items.equipped,
              inventory: this.state.items.inventory,
              anya_quests: this.state.anya_quests,
              expansion: this.state.header.status.expansion,
            }}
          />
          <Skills data={this.state.skills} />
        </Grid>
        {this.state.merc_items !== null && (
          <Grid className="character-sheet merc">
            <Merc type={this.state.header.merc_type} name={this.state.header.merc_name_id} data={this.state.merc_items} />
          </Grid>
        )}
        {this.state.golem_item !== null && (
          <Grid className="character-sheet iron-golem">
            <IronGolem data={this.state.golem_item} />
          </Grid>
        )}
      </div>
    );
  }
}
