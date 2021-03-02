import React from 'react'
import { Radar } from 'react-chartjs-2';

export default class RadarStats extends React.Component {

    state = {
        dataset: null,
        total_kills: 0
    }

    constructor(props) {
        super(props);

        var data = {}
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
        var labels = [];
        var points = [];

        for (const [key, value] of Object.entries(data)) {
            labels.push(key);
            points.push(value);
        }

        var dataset = {
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
        var labels = [];
        var time = [];
        var kills = [];

        for (const [area, value] of Object.entries(data)) {
            labels.push(area);
            time.push(value.time)
            kills.push(value.kills)
        }

        var dataset = {
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
                                        'rgba(87, 147, 150, 0.1)'
                                    ]
                                },
                                ticks: {
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
            </div>
        );
    }
};
