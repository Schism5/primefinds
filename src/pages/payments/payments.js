import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import ClearIcon from '@material-ui/icons/Clear';
import UtilCard from './UtilCard.js';

class Payments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            one: '$0',
            two: '$0',
            three: '$0',
            four: '$0',
            onePercent: 0.25,
            twoPercent: 0.4,
            threePercent: 0.2,
            fourPercent: 0.15,
            errorMsg: ''
        };
      
        this.handleChange = this.handleChange.bind(this);
        this.calculate = this.calculate.bind(this);
        this.setPercentages = this.setPercentages.bind(this);
        this.clearAmount = this.clearAmount.bind(this);
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
                    <UtilCard type="Office" percent="25" amount={this.state.one}   setPercentages={this.setPercentages} pkey="onePercent"  />
                    <UtilCard type="House"  percent="40" amount={this.state.two}   setPercentages={this.setPercentages} pkey="twoPercent"  />
                    <UtilCard type="Other"  percent="20" amount={this.state.three} setPercentages={this.setPercentages} pkey="threePercent"/>
                    <UtilCard type="Other"  percent="15" amount={this.state.four}  setPercentages={this.setPercentages} pkey="fourPercent" />
                </div>

                <div style={{color:'red', marginTop:'20px'}}>{this.state.errorMsg}</div>
            </div>
        );
    }

    setPercentages = (o) => {
        this.setState(o, () => {
            const total = this.state.onePercent + this.state.twoPercent + this.state.threePercent + this.state.fourPercent;
            this.setState({
            errorMsg: total !== 1 ? `Percentages add up to ${parseInt(total*100)}, they should add up to 100` : ''
            });

            this.calculate(Number(this.state.name));
        });
    }
    
    calculate = (amount) => {
        this.setState({
            one  : this.formatDollar(amount * this.state.onePercent),
            two  : this.formatDollar(amount * this.state.twoPercent),
            three: this.formatDollar(amount * this.state.threePercent),
            four : this.formatDollar(amount * this.state.fourPercent)
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