import React from 'react'
import { Cell } from 'react-mdl'
import {HorizontalBar} from 'react-chartjs-2';
import './style.css'

export default class Skills extends React.Component {

    state = {
        dataset: null
    }

    constructor(props) {
        super(props);

        var labels = [];
        var points = [];

        props.data.map(function(skill) {
            labels.push(skill.name);
            points.push(skill.points);
            return true;
        });

        var dataset = {
            labels: labels,
            datasets: [
                {
                    label: "Allocated points",
                    labelColor: "#ff0000",
                    backgroundColor: [
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',
                        'rgba(170, 57, 57, 0.5)',

                        /*'#B9CC66',
                        '#E5F5A3',
                        '#B9CC66',
                        '#44887B',
                        '#6DA398',
                        '#489075',
                        '#73AC96',
                        '#0E563B',
                        '#407F7F',
                        '#0D4D4D',
                        '#226666',
                        '#72A1A1',
                        '#2B6D6D',
                        '#7FB39F',
                        '#419E94',
                        '#2DB2A4',
                        '#4784A1',
                        '#4B7AA4',
                        '#1E405E',
                        '#185A53',
                        '#56A9A0',
                        '#19403B',
                        '#057E71',
                        '#2A4E6E',
                        '#133453',
                        '#4A6B8A',
                        '#297C45',
                        '#6A9E98',
                        '#0D4F48',
                        '#236A62'*/
                    ],
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
                            legend: {display: false}
                        }}
                    />
                </div>
            </Cell>
        );
    }
};
