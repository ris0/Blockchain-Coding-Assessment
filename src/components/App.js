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
      txs: [],
      newTxMsg: false,
      newTxs: []
    }
    this.newTransactionReceived = this.newTransactionReceived.bind(this);
  }

  newTransactionReceived = () => {
    this.setState({ newTxMsg: true })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.newTxMsg) {
      var transactions = this.state.txs;
      transactions.unshift(this.state.newTxs);
      this.setState({
        txs: transactions,
        newTxMsg: false,
      });
    }
  }

  openSocketConnection() {
    const websocket = new WebSocket("ws://ws.blockchain.info/inv");
    websocket.onopen = (evt) => {
      const msg = {
        "op": "addr_sub",
        "addr": this.a.refs.input.value
      }
      websocket.send(JSON.stringify(msg));
    };

    websocket.onmessage = (evt) => {
      const newData = JSON.parse(evt.data);
      const newTxObj = {
        time: newData.x.time,
        hash: newData.x.hash
      }
      const result = [];
      result.push(newTxObj);
      this.newTransactionReceived()
      this.setState({
        newTxs: result,
        newTxMsg: false
      });
    };

    websocket.onclose = (evt) => { console.log('Connection closed') };
    websocket.onerror = (evt) => { console.log('Error occurred', evt) };
  }

  getBalance = () => {
    console.log('get balance');
    const addr = this.state.address;
    const url = `https://blockchain.info/multiaddr?cors=true&active=${addr}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
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

    this.openSocketConnection();
  };

  searchAddress = () => {
    const inputVal = this.a.refs.input.value
    if (inputVal.length === 34) {
      this.setState({ address: inputVal })
      setTimeout(() => { this.getBalance() }, 200)
    } else {
      alert("Incorrect address");
    }
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
