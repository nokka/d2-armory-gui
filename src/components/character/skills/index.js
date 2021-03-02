import React from 'react'
import { Cell } from 'react-mdl'
import { HorizontalBar } from 'react-chartjs-2';
import './style.css'

export default class Skills extends React.Component {

    state = {
        dataset: null
    }

    constructor(props) {
        super(props);

        var labels = [];
        var points = [];

        props.data.map(function (skill) {
            labels.push(skill.name);
            points.push(skill.points);
            return true;
        });

        var backgroundColors = [];

        for (var i = 0; i < 30; i++) {
            backgroundColors.push('rgba(87, 147, 150, 0.7)');
        }
        var dataset = {
            labels: labels,
            datasets: [
                {
                    label: "Points",
                    labelColor: "#ff0000",
                    backgroundColor: backgroundColors,
                    borderWidth: 0,
                    data: points,
                }
            ]
        }

        this.state = {
            data: dataset
        };
    }

    render() {
        return (
            <Cell className="skills" col={8} tablet={12} phone={12}>
                <h3 className="underlined">Skills</h3>
                <div className="skill-chart">
                    <HorizontalBar
                        data={this.state.data}
                        height={430}
                        options={{
                            maintainAspectRatio: false,
                            barThickness: 10,
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        fontfamily: "'Roboto'",
                                        fontColor: "#a99877",
                                        fontSize: 11,
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        fontColor: "#a99877",
                                        fontSize: 11,
                                    }
                                }]
                            },
                            legend: { display: false },
                            tooltips: {
                                displayColors: false
                            }
                        }}
                    />
                </div>
            </Cell>
        );
    }
};
