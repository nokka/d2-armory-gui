import React from 'react'
import { HorizontalBar } from 'react-chartjs-2';

export default class Bar extends React.Component {

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
            case 'elites':
                data = this.buildEliteDataset(props.data.area)
                break
            case 'efficiency':
                data = this.buildEfficiencyDataset(props.data.area)
                break
            default:
                data = this.buildMonsterDataset(props.data.special)
        }

        this.state = {
            dataset: data.dataset,
            options: data.options,
            total_kills: props.data.total_kills,
            total_unique_kills: props.data.total_unique_kills,
            total_champ_kills: props.data.total_champ_kills,
            nrDataPoints: data.dataPoints
        };
    }

    buildMonsterDataset(data) {
        let labels = [];
        let points = [];

        if (data !== null) {
            for (const [key, value] of Object.entries(data)) {
                labels.push(key);
                points.push(value);
            }
        }

        let dataset = {
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

        return {
            dataset: dataset,
            dataPoints: points.length,
            options: {
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
            }
        }
    }

    buildAreaDataset(data) {
        let labels = [];
        let time = [];
        let kills = [];

        for (const [area, value] of Object.entries(data)) {
            labels.push(area);
            time.push(value.time)
            kills.push(value.kills)
        }

        let dataset = {
            labels: labels,
            datasets: [
                {
                    label: "Time",
                    backgroundColor: 'rgba(102, 255, 97, 0.1)',
                    borderColor: 'rgba(102, 255, 97, 0.8)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(102, 255, 97, 0.8)',
                    hoverBorderColor: 'rgba(102, 255, 97, 0.2)',
                    data: time
                },
                {
                    label: "Kills",
                    backgroundColor: 'rgba(255,99,132,0.1)',
                    borderColor: 'rgba(255,99,132,0.8)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.8)',
                    hoverBorderColor: 'rgba(255,255,255,0.2)',
                    data: kills
                }
            ]
        };

        return {
            dataset: dataset,
            dataPoints: kills.length,
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        barPercentage: 0.5,
                        categoryPercentage: 0.5,
                        ticks: {
                            callback: function (value) {
                                if (value.length > 12) {
                                    return value.substr(0, 12) + '...';
                                } else {
                                    return value
                                }
                            },
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
                }, tooltips: {
                    displayColors: false
                }
            }
        }
    }

    buildEliteDataset(data) {
        let labels = [];
        let uniques = [];
        let champs = [];

        for (const [area, value] of Object.entries(data)) {
            labels.push(area);
            uniques.push(value.uniquekills)
            champs.push(value.champkills)
        }

        let dataset = {
            labels: labels,
            datasets: [
                {
                    label: "Elites",
                    backgroundColor: 'rgba(169, 152, 119, 0.5)',
                    borderColor: 'rgba(169, 152, 119, 0.9)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(169, 152, 119, 0.9)',
                    hoverBorderColor: 'rgba(169, 152, 119, 0.6)',
                    data: uniques
                },
                {
                    label: "Champions",
                    backgroundColor: 'rgba(80, 79, 167, 0.5)',
                    borderColor: 'rgba(80, 79, 167, 0.9)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(80, 79, 167, 0.9)',
                    hoverBorderColor: 'rgba(80, 79, 167, 0.6)',
                    data: champs
                }
            ]
        };

        return {
            dataset: dataset,
            dataPoints: uniques.length,
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        barPercentage: 0.5,
                        categoryPercentage: 0.5,
                        ticks: {
                            callback: function (value) {
                                if (value.length > 12) {
                                    return value.substr(0, 12) + '...';
                                } else {
                                    return value
                                }
                            },
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
                }, tooltips: {
                    displayColors: false
                }
            }
        }
    }


    buildEfficiencyDataset(data) {
        let labels = [];
        let uniques = [];
        let champs = [];

        for (const [area, value] of Object.entries(data)) {
            labels.push(area);

            let minutes = value.time / 60

            uniques.push((value.uniquekills/minutes).toFixed(3))
            champs.push((value.champkills/minutes).toFixed(3))
        }

        let dataset = {
            labels: labels,
            datasets: [
                {
                    label: "Elites per minute",
                    backgroundColor: 'rgba(169, 152, 119, 0.5)',
                    borderColor: 'rgba(169, 152, 119, 0.9)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(169, 152, 119, 0.9)',
                    hoverBorderColor: 'rgba(169, 152, 119, 0.6)',
                    data: uniques
                },
                {
                    label: "Champions per minute",
                    backgroundColor: 'rgba(80, 79, 167, 0.5)',
                    borderColor: 'rgba(80, 79, 167, 0.9)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(80, 79, 167, 0.9)',
                    hoverBorderColor: 'rgba(80, 79, 167, 0.6)',
                    data: champs
                }
            ]
        };

        return {
            dataset: dataset,
            dataPoints: uniques.length,
            options: {
                scales: {
                    yAxes: [{
                        gridLines: {
                            display: false
                        },
                        barPercentage: 0.5,
                        categoryPercentage: 0.5,
                        ticks: {
                            callback: function (value) {
                                if (value.length > 12) {
                                    return value.substr(0, 12) + '...';
                                } else {
                                    return value
                                }
                            },
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
                }, tooltips: {
                    displayColors: false
                }
            }
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
                <div>
                    <HorizontalBar data={this.state.dataset} options={this.state.options} />
                </div>
                <p><i>(The chart displays the top 8 data points)</i></p>
            </div>
        );
    }
};
