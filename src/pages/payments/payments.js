import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import ClearIcon from '@material-ui/icons/Clear';
import UtilCard from './UtilCard.js';
import axios from 'axios';

class Payments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            one: '$0',
            two: '$0',
            three: '$0',
            four: '$0',
            "1Percent": 0.25,
            "2Percent": 0.4,
            "3Percent": 0.2,
            "4Percent": 0.15,
            errorMsg: '',
            data: []
        };
      
        this.handleChange = this.handleChange.bind(this);
        this.calculate = this.calculate.bind(this);
        this.setPercentages = this.setPercentages.bind(this);
        this.clearAmount = this.clearAmount.bind(this);

        this.numToName = {
            1: "one",
            2: "two",
            3: "three",
            4: "four"
        };
    }

    componentWillMount() {
        const me = this;
        axios.get('https://api.mlab.com/api/1/databases/heroku_0lwkfbwj/collections/bills?apiKey=aVVSLiUK4fYFdptcpCwQR2sO9QXtZKXs')
        .then(resp => {
            me.setState({
                data: resp.data
            });
        });
    }

    render() {
        return(
            <div style={{padding:'20px'}}>
                <div>
                    <TextField
                        id="outlined-name"
                        label="Dollar Amount"
                        value={this.state.name}
                        onChange={this.handleChange()}
                        margin="normal"
                        variant="outlined"
                        color="secondary"
                        style={{width:'230px', display:'inline-block'}}
                    />
                    <Button 
                        variant="raised" 
                        color="primary" 
                        style={{marginTop:'19px', height:'50px', width:'55px', marginLeft:'0px', minWidth:'55px'}}
                        onClick={this.clearAmount}>
                        <ClearIcon />
                    </Button>
                </div>
                
                <div style={{marginTop:'25px'}}>
                    {this.state.data.map((item, index) => {
                        return (<UtilCard 
                            key={item.name}
                            type={item.name} 
                            percent={item.percent} 
                            amount={this.state[this.numToName[index+1]]} 
                            setPercentages={this.setPercentages} 
                            pkey={(index+1) + 'Percent'}
                        />);
                    })}
                </div>

                <div style={{color:'red', marginTop:'20px'}}>{this.state.errorMsg}</div>
            </div>
        );
    }

    setPercentages = (o) => {
        this.setState(o, () => {
            const total = this.state['1Percent'] + this.state['2Percent'] + this.state['3Percent'] + this.state['4Percent'];
            this.setState({
                errorMsg: total !== 1 ? `Percentages add up to ${parseInt(total*100)}, they should add up to 100` : ''
            });

            this.calculate(Number(this.state.name));
        });
    }
    
    calculate = (amount) => {
        this.setState({
            one  : this.formatDollar(amount * this.state['1Percent']),
            two  : this.formatDollar(amount * this.state['2Percent']),
            three: this.formatDollar(amount * this.state['3Percent']),
            four : this.formatDollar(amount * this.state['4Percent'])
        });
    }

    formatDollar(num) {
        return '$' + (String(num).split('.')[1] ? num.toFixed(2) : num);
    }
    
    handleChange = () => event => {
        this.setState({
            name: event.target.value
        });

        this.calculate(Number(event.target.value));
    }

    clearAmount = () => {
        this.setState({name:''}, () => this.calculate(0));
    }
}

export default Payments;