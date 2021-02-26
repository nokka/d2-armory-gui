import React from 'react'
import { Radar } from 'react-chartjs-2';

export default class RadarStats extends React.Component {

    state = {
        dataset: null,
        total_kills: 0
    }

    constructor(props) {
        super(props);

        var labels = [];
        var points = [];

        if (props.data.champions > 0) {
            labels.push("Champions")
            points.push(props.data.champions)
        }

        if (props.data.uniques > 0) {
            labels.push("Uniques")
            points.push(props.data.uniques)
        }

        for (const [key, value] of Object.entries(props.data.special)) {
            labels.push(key);
            points.push(value);
        }

        var data = {
            labels: labels,
            datasets: [
                {
                    label: '',
                    backgroundColor: 'rgba(255, 99, 132, 0.1)',
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(255, 99, 132, 0.9)',
                    data: points,
                },
            ]
        };

        this.state = {
            dataset: data,
            total_kills: props.data.total_kills
        };
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
                            title: {
                                display: false,
                            },
                            legend: { display: false },
                            scale: {
                                gridLines: {
                                    display: true,
                                    color: [
                                        'rgba(87, 147, 150, 0.1)'
                                    ]
                                },
                                ticks: {
                                    /*autoSkip: true,
                                    stepSize: 1,
                                    fontSize: 10,
                                    fontfamily: "'Roboto'",
                                    fontColor: "#a99877",
                                    beginAtZero: true,*/
                                    backdropColor: "rgba(0, 0, 0, 0)",
                                    callback: function () { return "" }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
};
