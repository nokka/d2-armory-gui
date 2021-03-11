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
        chart_type: null
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
        super(props)

        this.state = {
            type_tab: 1,
            data: props.data,
            chart_type: 'radar',
            difficulty_tab: this.getDefaultDifficulty(props.level),
        };
    }

    setChartType(type) {
        this.setState({
            chart_type: type
        })
    }

    getDefaultDifficulty(level) {
        switch (true) {
            case level <= 24:
                return 0
            case level > 24 && level < 60:
                return 1
            default:
                return 2
        }
    }

    getChart(chartType, difficultyTab, typeTab) {
        let Chart = chartType === 'bar' ? Bar : Radar
        return <Chart
            type={this.types[typeTab]}
            data={this.state.data[this.difficulties[difficultyTab]]}
            key={`${chartType}-${difficultyTab}-${typeTab}`}
        />
    }

    render() {
        let { chart_type, difficulty_tab, type_tab } = this.state

        return (
            <Cell className="statistics" col={12}>
                <h3 className="underlined">{this.types[type_tab]} Statistics</h3>
                <Tabs className="stats-type-tab" activeTab={type_tab} onChange={(tabId) => this.setState({ type_tab: tabId })}>
                    <Tab>Monsters</Tab>
                    <Tab>Areas</Tab>
                </Tabs>
                <Tabs className="stats-difficulty-tab" activeTab={difficulty_tab} onChange={(tabId) => this.setState({ difficulty_tab: tabId })}>
                    <Tab>Normal</Tab>
                    <Tab>Nightmare</Tab>
                    <Tab>Hell</Tab>
                </Tabs>
                <div className="statistics-box">
                    <div className="chart-picker">
                        <IconToggle checked={chart_type === 'bar'} onChange={(e) => this.setChartType('bar')} ripple name="article" />
                        <IconToggle checked={chart_type === 'radar'} onChange={(e) => this.setChartType('radar')} ripple name="radar" />
                    </div>

                    {this.getChart(chart_type, difficulty_tab, type_tab)}
                </div>
            </Cell>
        );
    }
};
