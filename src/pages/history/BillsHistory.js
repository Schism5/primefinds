import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class BillsHistory extends Component {
    constructor(props) {
        super(props);

        this._getChart = this._getChart.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        return (
            <div style={{ padding: '20px' }}>
                <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    defaultValue="2018-11-30"
                    onChange={this.onChange}
                />
                <TextField
                    id="date"
                    label="End Date"
                    type="date"
                    defaultValue="2018-12-31"
                    style={{marginLeft:'80px'}}
                />
                <div id="chart_div" style={{width: '500px', height: '400px', marginTop:'100px'}}></div>
            </div>
        );
    }

    onChange() {
        this._getChart();
    }

    _getChart() {
        let info = [
            {
                "_id": {
                    "$oid": "5bfdedebfb6fc006ff268fb2"
                },
                "name": "Office",
                "percent": 25,
                "stringAmount": "$2.50",
                "numberAmount": 2.5
            },
            {
                "_id": {
                    "$oid": "5bfdee65fb6fc006ff268fe6"
                },
                "name": "House",
                "percent": 40,
                "stringAmount": "$4",
                "numberAmount": 4
            },
            {
                "_id": {
                    "$oid": "5bfdee7ffb6fc006ff268ff9"
                },
                "name": "Other1",
                "percent": 20,
                "stringAmount": "$2",
                "numberAmount": 2
            },
            {
                "_id": {
                    "$oid": "5bfdee90fb6fc006ff269001"
                },
                "name": "Other2",
                "percent": 10,
                "stringAmount": "$1",
                "numberAmount": 1
            },
            {
                "_id": {
                    "$oid": "5bfed8f5fb6fc006ff27381f"
                },
                "name": "Other3",
                "percent": 5,
                "stringAmount": "$0.50",
                "numberAmount": 0.5
            }
        ];

        var data = new window.google.visualization.DataTable();
        data.addColumn('string', 'Bills');

        function getRandomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        let d = info.map(item => {
            return [item.name, item.numberAmount, getRandomColor()];
        });

        var data = window.google.visualization.arrayToDataTable([
            ['Name', 'Dollars', { role: 'style' }],
            ...d
        ]);

        var view = new window.google.visualization.DataView(data);
        view.setColumns([0, 1,
            {
                calc: "stringify",
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            },
            2
        ]);

        var options = {
            vAxis: {
                title: 'Dollars'
            },
            backgroundColor: 'transparent',
            legend: { position: "none" },
            bar: { groupWidth: "75%" },
        };

        var chart = new window.google.visualization.ColumnChart(document.getElementById('chart_div'));

        chart.draw(view, options);
    }
}

export default BillsHistory;