import React, { Component } from 'react';
import './App.css';
import Payments from './pages/payments/Payments';
import Sales from './pages/sales/Sales';
import BillsHistory from './pages/history/BillsHistory';
import Header from './Header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 'Payments'
    }

    this.setPage = this.setPage.bind(this);
  }

  render() {
    let page;
    switch(this.state.page) {
      case 'Payments': 
        page = <Payments />;
        break;
      case 'Sales':
        page = <Sales />;
        break;
      case 'BillsHistory':
        page = <BillsHistory />;
        break;
      default:
        page = <div>Error in switch statement</div>
    }

    return (
      <div style={{backgroundColor:'#d7dae2', minHeight:'100vh'}}>
        <Header setPage={this.setPage}></Header>
        {page}
      </div>
    );
  }

  setPage(name) {
    this.setState({page: name});
  }
}

export default App;
