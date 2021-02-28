import React from 'react'
import { HorizontalBar } from 'react-chartjs-2';

export default class Bar extends React.Component {

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

        var dataset = {
            labels: labels,
            datasets: [
                {
                    label: '',
                    backgroundColor: 'rgba(255,99,132,0.1)',
                    borderColor: 'rgba(255,99,132,0.8)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.8)',
                    hoverBorderColor: 'rgba(255,255,255,0.2)',
                    data: points,
                }
            ]
        }

        this.state = {
            dataset: dataset,
            total_kills: props.data.total_kills,
            nrDataPoints: points.length
        };
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
                    <HorizontalBar
                        data={this.state.dataset}
                        height={500}
                        options={{
                            maintainAspectRatio: false,
                            legend: { display: false },
                            scales: {
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    },
                                    barPercentage: 0.1,
                                    categoryPercentage: 0.5,
                                    ticks: {
                                        callback: function (value) {
                                            if (value.length > 12) {
                                                return value.substr(0, 12) + '...';
                                            } else {
                                                return value
                                            }
                                        },
                                        stepSize: 1,
                                        autoSkip: false,
                                        fontfamily: "'Roboto'",
                                        fontColor: "#a99877",
                                        fontSize: 10,
                                        suggestedMin: 0,
                                        beginAtZero: true
                                    }
                                }],
                                xAxes: [{
                                    position: 'top',
                                    gridLines: {
                                        color: 'rgba(87, 147, 150, 0.1)'
                                    },
                                    ticks: {
                                        maxRotation: 0,
                                        minRotation: 0,
                                        padding: 10,
                                        fontSize: 10,
                                        fontColor: "#a99877",
                                        suggestedMin: 0,
                                        beginAtZero: true
                                    }
                                }]
                            },
                            tooltips: {
                                displayColors: false,
                                callbacks: {
                                    label: function (tooltipItem, data) {
                                        return tooltipItem.xLabel;
                                    },
                                    title: function (tooltipItem, data) {
                                        return;
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
        );
    }
};
