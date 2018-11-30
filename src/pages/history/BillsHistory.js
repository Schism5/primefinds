import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class BillsHistory extends Component {
    constructor(props) {
        super(props);

        this._getChart = this._getChart.bind(this);
        this.onClick   = this.onClick.bind(this);
        this._getTable = this._getTable.bind(this);
        this.onStartChange = this.onStartChange.bind(this);
        this.onEndChange = this.onEndChange.bind(this);

        this.state = {
            showTable: false,
            start: '11-29-2018',
            end: '12-01-2018',
            tableData: []
        };

        this.data = [
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
    }

    render() {
        return (
            <div style={{ padding: '20px' }}>
                <TextField
                    id="date"
                    label="Start Date"
                    type="date"
                    defaultValue="2018-11-30"
                    onChange={this.onStartChange}
                />
                <TextField
                    id="date"
                    label="End Date"
                    type="date"
                    defaultValue="2018-12-01"
                    style={{marginLeft:'50px'}}
                    onChange={this.onEndChange}
                />
                <Button variant="outlined" color="primary" style={{marginTop:'5px', marginLeft:'50px'}} onClick={this.onClick}>
                    Get Data
                </Button>
                <div style={{marginTop: '100px'}}>
                    {this.state.showTable ? this._getTable() : null}
                    <div id="chart_div" style={{ width: '500px', height: '350px', display: 'inline-block', verticalAlign:'middle'}}></div>
                </div>
            </div>
        );
    }

    onStartChange(evt) {
        const d = evt.target.value.split('-');
        this.setState({start: `${d[1]}-${d[2]}-${d[0]}`});
    }

    onEndChange(evt) {
        const d = evt.target.value.split('-');
        this.setState({ end: `${d[1]}-${d[2]}-${d[0]}` }, ()=> {console.log(this.state)});
    }

    onClick() {
        let start = new Date(this.state.start).getTime();
        let end = new Date(this.state.end).getTime();
        const url = `https://api.mlab.com/api/1/databases/heroku_0lwkfbwj/collections/bills_history?q={epoch:{$lt:${end},$gt:${start}}}&apiKey=aVVSLiUK4fYFdptcpCwQR2sO9QXtZKXs`;
        axios.get(url).then(resp => {
            let info = {};
            for(let history of resp.data) {
                for(let bill of history.data) {
                    if(info[bill.name]) {
                        info[bill.name] += bill.numberAmount;
                    }
                    else {
                        info[bill.name] = bill.numberAmount
                    }
                }
            }

            let data = [];
            for(let k in info) {
                data.push({
                    name: k,
                    value: info[k]
                });
            }

            this.setState({ tableData: data, showTable: true });
            //this._getChart();
        });
    }

    _getTable() {
        return (
            <Paper style={{width:'300px', display:'inline-block', verticalAlign:'middle', marginRight:'50px'}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell numeric>Amount Spent</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tableData.map(row => {
                            return (
                                <TableRow key={row.name}>
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell numeric>{row.value}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }

    _getChart() {
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

        let d = this.data.map(item => {
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
            backgroundColor: 'transparent',
            legend: { position: "none" },
            bar: { groupWidth: "75%" },
        };

        var chart = new window.google.visualization.ColumnChart(document.getElementById('chart_div'));

        chart.draw(view, options);
    }
}

export default BillsHistory;