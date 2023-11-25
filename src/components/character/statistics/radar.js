import React from 'react'
import { Radar } from 'react-chartjs-2';
import TotalKills from "./total-kills";

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
            total_kills: props.data.total_kills,
            total_unique_kills: props.data.total_unique_kills,
            total_champ_kills: props.data.total_champ_kills,
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

    buildEliteDataset(data) {
        let labels = [];
        let uniques = [];
        let champs = [];

        if (data !== null) {
            for (const [area, value] of Object.entries(data)) {
                labels.push(area);
                uniques.push(value.uniquekills)
                champs.push(value.champkills)
            }
        }

        let dataset = {
            labels: labels,
            datasets: [
                {
                    label: 'Elite kills',
                    backgroundColor: 'rgba(169, 152, 119, 0.3)',
                    borderColor: 'rgba(169, 152, 119, 1.0)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(169, 152, 119, 0.9)',
                    data: uniques,
                },
                {
                    label: 'Champion kills',
                    backgroundColor: 'rgba(80, 79, 167, 0.3)',
                    borderColor: 'rgba(80, 79, 167, 1.0)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(80, 79, 167, 0.9)',
                    data: champs,
                },
            ]
        };

        return {
            dataset: dataset,
            dataPoints: uniques.length
        }
    }

    buildEfficiencyDataset(data) {
        let labels = [];
        let uniques = [];
        let champs = [];

        if (data !== null) {
            for (const [area, value] of Object.entries(data)) {
                labels.push(area);
                
                let minutes = value.time / 60

                uniques.push((value.uniquekills/minutes).toFixed(3))
                champs.push((value.champkills/minutes).toFixed(3))
            }
        }

        let dataset = {
            labels: labels,
            datasets: [
                {
                    label: 'Elites per minute',
                    backgroundColor: 'rgba(169, 152, 119, 0.3)',
                    borderColor: 'rgba(169, 152, 119, 1.0)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(169, 152, 119, 0.9)',
                    data: uniques,
                },
                {
                    label: 'Champions per minute',
                    backgroundColor: 'rgba(80, 79, 167, 0.3)',
                    borderColor: 'rgba(80, 79, 167, 1.0)',
                    borderWidth: 1,
                    pointRadius: 3,
                    pointBackgroundColor: 'rgba(80, 79, 167, 0.9)',
                    data: champs,
                },
            ]
        };

        return {
            dataset: dataset,
            dataPoints: uniques.length
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
                
                <TotalKills
                    total_kills={this.state.total_kills}
                    total_unique_kills={this.state.total_unique_kills}
                    total_champ_kills={this.state.total_champ_kills}
                />
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
