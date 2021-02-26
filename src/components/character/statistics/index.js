import React from 'react'
import { Cell, Tabs, Tab, IconToggle } from 'react-mdl'
import './style.css'

// Charts.
import Bar from "./bar";
import Radar from "./radar";


export default class Statistics extends React.Component {
    state = {
        data: null,
        active_tab: 0,
        chart_type: null,
    }

    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            active_tab: 2,
            chart_type: 'bar',
        };
    }

    setChartType(type) {
        this.setState({
            chart_type: type
        })
    }

    render() {
        return (
            <Cell className="statistics" col={12}>
                <h3 className="underlined">Kill statistics</h3>
                <Tabs className="statistics-tab" activeTab={this.state.active_tab} onChange={(tabId) => this.setState({ active_tab: tabId })} ripple>
                    <Tab>Normal</Tab>
                    <Tab>Nightmare</Tab>
                    <Tab>Hell</Tab>
                </Tabs>
                <div className="statistics-box">
                    <div className="chart-picker">
                        <IconToggle checked={this.state.chart_type === 'bar'} onChange={(e) => this.setChartType('bar')} ripple name="article" />
                        <IconToggle checked={this.state.chart_type === 'radar'} onClick={(e) => this.setChartType('radar')} ripple name="radar" />
                    </div>
                    {this.state.active_tab === 0 && this.state.chart_type === 'bar' && (
                        <Bar data={this.state.data.normal} />
                    )}
                    {this.state.active_tab === 0 && this.state.chart_type === 'radar' && (
                        <Radar data={this.state.data.normal} />
                    )}
                    {this.state.active_tab === 1 && this.state.chart_type === 'bar' && (
                        <Bar data={this.state.data.nightmare} />
                    )}
                    {this.state.active_tab === 1 && this.state.chart_type === 'radar' && (
                        <Radar data={this.state.data.nightmare} />
                    )}
                    {this.state.active_tab === 2 && this.state.chart_type === 'bar' && (
                        <Bar data={this.state.data.hell} />
                    )}
                    {this.state.active_tab === 2 && this.state.chart_type === 'radar' && (
                        <Radar data={this.state.data.hell} />
                    )}
                </div>
            </Cell>
        );
    }
};
