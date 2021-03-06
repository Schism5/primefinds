import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

class UtilCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent: props.percent
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  render() {
    return (
      <Card style={{width:'250px', padding:'17px', marginTop:'15px'}}>
        <div style={{display:'inline-block', width:'30px'}}>
          <TextField
            value={this.state.percent}
            onChange={this.handleChange()}
            style={{display:'inline-block', verticalAlign:'middle', width:'30px'}}
            inputProps={{
              style:{padding:'2px'}
            }}
            onFocus={this.handleFocus()}
            onBlur={this.handleBlur()}
          />
        </div>
        <span style={{verticalAlign:'middle', marginRight:'20px'}}>%</span>
        <div style={{color:'#3f51b5', fontWeight:'600', display:'inline-block', verticalAlign:'middle'}}>{this.props.type}</div>
        <div style={{display:'inline-block', float:'right', marginTop:'3px'}}>{this.props.amount}</div>
      </Card>
    );
  }

  handleFocus = () => event => {
    if(this.state.percent === 0) {
      this.setState({percent: ''});
    }
  }

  handleBlur = () => event => {
    if(this.state.percent === '') {
      this.setState({percent: 0}, this.setPer);
    }
  }

  handleChange = () => event => {
    const value = event.target.value;

    if(value.length <= 3) {
      this.setState({
        percent: value ? parseInt(value) : 0
      }, this.setPer);
    }
  }

  setPer = () => this.props.setPercentages(this.props.pkey, this.state.percent)
}

export default UtilCard;