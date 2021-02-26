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
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,1.0)',
                    hoverBorderColor: 'rgba(255,255,255,1)',
                    data: points,
                }
            ]
        }

        this.state = {
            dataset: dataset,
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
                    <HorizontalBar
                        data={this.state.dataset}
                        height={500}
                        options={{
                            maintainAspectRatio: false,
                            legend: { display: false },
                            scales: {
                                yAxes: [{
                                    gridLines: {
                                        //display: false,
                                        color: 'rgba(87, 147, 150, 0.2)'
                                    },
                                    barPercentage: 0.1,
                                    categoryPercentage: 0.5,
                                    ticks: {
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
                                        display: false,
                                        color: 'rgba(87, 147, 150, 0.2)'
                                    },
                                    barPercentage: 0.5,
                                    categoryPercentage: 0.5,
                                    //barValueSpacing: 1,
                                    //barDatasetSpacing: 0.1,
                                    //barThickness: 5,
                                    //maxBarThickness: 10,
                                    // ticks: {
                                    //     stepSize: 1,
                                    //     //autoSkip: false,
                                    //     maxRotation: 0,
                                    //     minRotation: 0,
                                    //     padding: 10,
                                    //     fontSize: 10,
                                    //     fontColor: "#a99877",
                                    //     suggestedMin: 0,
                                    //     beginAtZero: true
                                    // }
                                }]
                            },
                        }}
                    />
                </div>
            </div>
        );
    }
};
