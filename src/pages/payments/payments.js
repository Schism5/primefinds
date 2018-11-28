import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import ClearIcon from '@material-ui/icons/Clear';
import UtilCard from './UtilCard.js';
import axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

class Payments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            data: [],
            errorMsg: '',
            boxChecked: false,
            isDownloading: true
        };
      
        this.handleChange = this.handleChange.bind(this);
        this.calculate = this.calculate.bind(this);
        this.setPercentages = this.setPercentages.bind(this);
        this.clearAmount = this.clearAmount.bind(this);
    }

    componentWillMount() {
        const me  = this;
        const url = 'https://api.mlab.com/api/1/databases/heroku_0lwkfbwj/collections/bills?apiKey=aVVSLiUK4fYFdptcpCwQR2sO9QXtZKXs';

        axios.get(url).then(resp => me.setState({data: resp.data, isDownloading: false}));
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
                        variant="contained" 
                        color="primary" 
                        style={{marginTop:'19px', height:'50px', width:'55px', marginLeft:'0px', minWidth:'55px'}}
                        onClick={this.clearAmount}>
                        <ClearIcon />
                    </Button>
                </div>
                
                <div style={{marginTop:'25px'}}>
                    {this.state.isDownloading ? 
                        <CircularProgress style={{width:'70px', height:'70px'}}/> 
                        : 
                        this.state.data.map(item => {
                            return (<UtilCard 
                                key={item.name}
                                type={item.name} 
                                percent={item.percent} 
                                amount={item.amount} 
                                setPercentages={this.setPercentages} 
                                pkey={item.name}
                            />);
                        })
                    }
                </div>

                <div style={{color:'red', marginTop:'20px', minHeight:'30px', visibility:this.state.errorMsg?'visible':'hidden'}}>{this.state.errorMsg}</div>

                <br></br>
                <div>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.boxChecked}
                                onChange={(event) => this.setState({ boxChecked: event.target.checked })}
                                value="eh"
                                color="primary"
                                label="I'm ready to save for today"
                            />
                        }
                        label="I'm Ready to Save"
                    />
                    <Button 
                        variant="contained" 
                        color="primary" 
                        disabled={!this.state.boxChecked}
                        onClick={() => setTimeout(()=>this.setState({boxChecked: false}), 500)}
                        style={{marginLeft:'50px'}}>
                    Save
                    </Button>
                </div>
            </div>
        );
    }

    setPercentages = (k, v) => {
        this.setState({
            data: this.state.data.map(item => Object.assign(item, item.name === k ? {percent: v} : {}))
        }, () => {
            const total = this.state.data.reduce((accum, current) => accum + current.percent, 0);

            this.setState({
                errorMsg: total !== 100 ? `Percentages add up to ${total}, they should add up to 100` : ''
            });

            this.calculate(Number(this.state.name));
        });
    }
    
    calculate = amount => {
        const am = Number(amount);
        this.setState({
            data: this.state.data.map(item => {
                let percent = am * (item.percent / 100);
                return Object.assign(item, {amount: this.formatDollar(percent)})
            })
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