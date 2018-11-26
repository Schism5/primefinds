import React, { Component } from 'react';
import './App.css';
import Payments from './pages/payments/Payments';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{backgroundColor:'#d7dae2', minHeight:'100vh'}}>
        <Header></Header>
        <Payments></Payments>
      </div>
    );
  }
}

export default App;
