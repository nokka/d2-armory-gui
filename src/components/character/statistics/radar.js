import React from 'react'
import { Radar } from 'react-chartjs-2';

export default class RadarStats extends React.Component {

    state = {
        dataset: null,
        total_kills: 0
    }

    constructor(props) {
        super(props);

        let data = {}
        switch (props.type) {
            case 'area':
                data = this.buildAreaDataset(props.data.area)
                break
            default:
                data = this.buildMonsterDataset(props.data.special)
        }

        this.state = {
            dataset: data.dataset,
            total_kills: props.data.total_kills,
            nrDataPoints: data.dataPoints
        };
    }

    buildMonsterDataset(data) {
        let labels = [];
        let points = [];

        for (const [key, value] of Object.entries(data)) {
            labels.push(key);
            points.push(value);
        }

        let dataset = {
            labels: labels,
            datasets: [
                {
                    label: 'Kills',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(255,99,132,0.8)',
                    data: points,
                },
            ]
        };

        return {
            dataset: dataset,
            dataPoints: points.length
        }
    }

    buildAreaDataset(data) {
        let labels = [];
        let time = [];
        let kills = [];

        if (data !== null) {
            for (const [area, value] of Object.entries(data)) {
                labels.push(area);
                time.push(value.time)
                kills.push(value.kills)
            }
        }

        let dataset = {
            labels: labels,
            datasets: [
                {
                    label: 'Seconds',
                    backgroundColor: 'rgba(102, 255, 97, 0.1)',
                    borderColor: 'rgba(102, 255, 97, 0.8)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(102, 255, 97, 0.8)',
                    data: time,
                },
                {
                    label: 'Kills',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(255,99,132,0.8)',
                    data: kills,
                },
            ]
        };

        return {
            dataset: dataset,
            dataPoints: kills.length
        }
    }

    render() {
        if (this.state.nrDataPoints === 0) {
            return (
                <div className="stats-msg">
                    <h4>No data available</h4>
                </div>
            );
        }

        return (
            <div>
                <div className="total-kills">
                    <h3>Total kills: {this.state.total_kills}</h3>
                </div>
                <div>
                    <Radar
                        data={this.state.dataset}
                        options={{
                            scale: {
                                gridLines: {
                                    display: true,
                                    color: [
                                        '#121F20',
                                        '#121F20',
                                        '#121F20',
                                        '#121F20',
                                        '#121F20',
                                        '#121F20',
                                        '#121F20',
                                        '#121F20'
                                    ]
                                },
                                ticks: {
                                    beginAtZero: true,
                                    backdropColor: "rgba(0, 0, 0, 0)",
                                    callback: function () { return "" }
                                },
                            },
                            tooltips: {
                                displayColors: false
                            }
                        }}
                    />
                </div>
                <p><i>(The chart displays the top 8 data points)</i></p>
            </div>
        );
    }
};
