import React, { Component } from 'react';
import './App.css';
import Payments from './pages/payments/payments'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{backgroundColor:'#d7dae2', height:'95vh', padding:'20px'}}>
        <Payments></Payments>
      </div>
    );
  }
}

export default App;
