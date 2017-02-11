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
        });

        var dataset = {
            labels: labels,
            datasets: [
                {
                    label: "Allocated points",
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
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
                <h3>Skills</h3>
                <div className="skill-chart">
                    <HorizontalBar
                        data={this.state.data}
                        height={450}
                        options={{
                            maintainAspectRatio: false,
                            barThickness: 10,
                            legend: {display: false}
                        }}
                    />
                </div>
            </Cell>
        );
    }
};
