import React, { Component } from 'react';
import './App.css';
import TextField from '@material-ui/core/TextField';
import UtilCard from './UtilCard.js';

class App extends Component {
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
  }

  render() {
    return (
      <div style={{backgroundColor:'#d7dae2', height:'95vh', padding:'20px'}}>
        <TextField
            id="outlined-name"
            label="Dollar Amount"
            value={this.state.name}
            onChange={this.handleChange()}
            margin="normal"
            variant="outlined"
            color="secondary"
            style={{width:'220px'}}
          />
        
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
  };

  calculate = (amount) => {
    let first = amount * this.state.onePercent,
        secon = amount * this.state.twoPercent,
        third = amount * this.state.threePercent,
        forth = amount * this.state.fourPercent;

    this.setState({
      one:  '$' + (String(first).split('.')[1] ? first.toFixed(2) : first),
      two:  '$' + (String(secon).split('.')[1] ? secon.toFixed(2) : secon),
      three:'$' + (String(third).split('.')[1] ? third.toFixed(2) : third),
      four: '$' + (String(forth).split('.')[1] ? forth.toFixed(2) : forth)
    });
  };

  handleChange = () => event => {
    this.setState({
      name: event.target.value
    });

    this.calculate(Number(event.target.value));
  };
}

export default App;
