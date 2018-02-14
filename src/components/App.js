import React, { Component } from 'react';
import './App.css';
import Header from './Header/Header'
import AccountSummary from './AccountSummary/AccountSummary';
import TransactionSummary from './TransactionSummary/TransactionSummary';
import SearchBar from './SearchBar/SearchBar';
import { convertToBtc } from '../util/helper'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      balance: 0,
      totalReceived: 0,
      totalSent: 0,
      totalTransactions: 0,
      txs: []
    }
  }

  getBalance = () => {
    // const addr = '17CUX3NGq2EeLwjXHAU95y3TjoRRvBmrbR'
    const addr = this.state.address;
    const url = `https://blockchain.info/multiaddr?cors=true&active=${addr}`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('data', data.wallet);
        const finalBalance = convertToBtc(data.wallet.final_balance);
        const totalReceived = convertToBtc(data.wallet.total_received);
        const totalSent = convertToBtc(data.wallet.total_sent);
        const totalTransactions = data.wallet.n_tx;
        const arrayOfTxs = [];
        data.txs.forEach(tx => arrayOfTxs.push(tx));
        const state = {
          balance: finalBalance,
          totalReceived: totalReceived,
          totalSent: totalSent,
          totalTransactions: totalTransactions,
          txs: arrayOfTxs
        };
        this.setState(state);
      })
  };

  searchAddress = () => {
    this.setState({ address: this.a.refs.input.value })
    setTimeout(() => { this.getBalance() }, 200)
  }

  render() {
    return (
      <div className="App">
        <Header />

        <SearchBar
          ref={component => this.a = component}
          searchAddress={this.searchAddress}
        />

        <AccountSummary
          address={this.state.address}
          totalReceived={this.state.totalReceived}
          totalSent={this.state.totalSent}
          balance={this.state.totalTransactions}
          totalTransactions={this.state.balance}
        />

        <TransactionSummary transactions={this.state.txs} />
      </div>
    );
  }
}

export default App;
