import React from 'react'
import { Cell, Tabs, Tab, IconToggle } from 'react-mdl'
import './style.css'

// Charts.
import Bar from "./bar";
import Radar from "./radar";


export default class Statistics extends React.Component {
    state = {
        data: null,
        type_tab: 0,
        difficulty_tab: 0,
        chart_type: null,
    }

    difficulties = {
        0: 'normal',
        1: 'nightmare',
        2: 'hell'
    }

    types = {
        0: 'monsters',
        1: 'area'
    }

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            type_tab: 1,
            difficulty_tab: 2,
            chart_type: 'radar',
        };
    }

    setChartType(type) {
        this.setState({
            chart_type: type
        })
    }

    render() {
        console.log("DIFFICULTY")
        console.log(this.difficulties[this.state.difficulty_tab])
        console.log("TYPE")
        console.log(this.types[this.state.type_tab])
        return (
            <Cell className="statistics" col={12}>
                <h3 className="underlined">Statistics</h3>
                <Tabs className="stats-type-tab" activeTab={this.state.type_tab} onChange={(tabId) => this.setState({ type_tab: tabId })} ripple>
                    <Tab>Unique monsters</Tab>
                    <Tab>Areas</Tab>
                </Tabs>
                <Tabs className="stats-difficulty-tab" activeTab={this.state.difficulty_tab} onChange={(tabId) => this.setState({ difficulty_tab: tabId })} ripple>
                    <Tab>Normal</Tab>
                    <Tab>Nightmare</Tab>
                    <Tab>Hell</Tab>
                </Tabs>
                <div className="statistics-box">
                    <div className="chart-picker">
                        <IconToggle checked={this.state.chart_type === 'bar'} onChange={(e) => this.setChartType('bar')} ripple name="article" />
                        <IconToggle checked={this.state.chart_type === 'radar'} onChange={(e) => this.setChartType('radar')} ripple name="radar" />
                    </div>

                    {/* {this.state.chart_type === 'bar' && (
                        <Bar data={this.state.data[this.difficulties[this.state.difficulty_tab]]} />
                    )}
                    {this.state.chart_type === 'radar' && (
                        <Radar data={this.state.data[this.difficulties[this.state.difficulty_tab]]} />
                    )} */}

                    {this.state.difficulty_tab === 0 && this.state.chart_type === 'bar' && (
                        <Bar data={this.state.data.normal} />
                    )}
                    {this.state.difficulty_tab === 0 && this.state.chart_type === 'radar' && (
                        <Radar data={this.state.data.normal} />
                    )}
                    {this.state.difficulty_tab === 1 && this.state.chart_type === 'bar' && (
                        <Bar data={this.state.data.nightmare} />
                    )}
                    {this.state.difficulty_tab === 1 && this.state.chart_type === 'radar' && (
                        <Radar data={this.state.data.nightmare} />
                    )}
                    {this.state.difficulty_tab === 2 && this.state.chart_type === 'bar' && (
                        <Bar type={'area'} data={this.state.data.hell} />
                    )}
                    {this.state.difficulty_tab === 2 && this.state.chart_type === 'radar' && (
                        <Radar type={'area'} data={this.state.data.hell} />
                    )}
                </div>
            </Cell>
        );
    }
};
