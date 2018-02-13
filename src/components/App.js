import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import AccountSummary from './AccountSummary/AccountSummary.js';
import TransactionSummary from './TransactionSummary/TransactionSummary.js';
import SearchBar from './SearchBar/SearchBar.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      balance: 0,
      totalReceived: 0,
      totalTransactions: 0,
      txs: []
    }
  }

  componentDidMount = () => {
    // this.getBalance();
  }

  convertToBtc = (balance) => {
    return balance / 100000000;
  }

  getBalance = () => {
    // const addr = '17CUX3NGq2EeLwjXHAU95y3TjoRRvBmrbR'
    const addr = this.state.address;
    const url = `https://blockchain.info/multiaddr?cors=true&active=${addr}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        // console.log(data);
        const finalBalance = this.convertToBtc(data.wallet.final_balance);
        const totalReceived = this.convertToBtc(data.wallet.total_received);
        const totalTransactions = data.wallet.n_tx;
        const arrayOfTxs = [];
        data.txs.forEach(tx => arrayOfTxs.push(tx));
        const state = {
          balance: finalBalance,
          totalReceived: totalReceived,
          totalTransactions: totalTransactions,
          txs: arrayOfTxs
        };
        this.setState(state);
      })
  };

  searchAddress = () => {
    this.setState({
      address: this.a.refs.input.value
    })
    setTimeout(() => { this.getBalance() }, 200)
    // this.getBalance();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Blockchain.info</h1>
        </header>

        <div className="search-bar">
          <SearchBar 
            ref={component => this.a = component}
            searchAddress={this.searchAddress}
          />
        </div>

        <div className="summary">
          <AccountSummary
            totalTransactions={this.state.balance}
            balance={this.state.totalTransactions}
            totalReceived={this.state.totalReceived}
          />
        </div>

        <div className="transaction-summary">
          <TransactionSummary transactions={this.state.txs} />
        </div>
      </div>
    );
  }
}

export default App;
