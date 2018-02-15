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
      newTransactions: false
    }
  }

  componentDidMount() {
    // this.testWebSocket(); // should only execute whenever an account address is passed
  }

  // invokeTestFunc = () => {
  //     this.setState({ newTransactions: true })
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //     return nextState.newTransactions === true;
  // }

  // componentDidUpdate(prevProps, prevState) {
  //     if (prevState.newTransactions) {
  //         const transactions = this.state.txs;
  //         const newTx = this.bar();
  //         transactions.unshift(newTx);
  //         console.log(transactions);
  //         this.setState({
  //             txs: transactions,
  //             newTransactions: false,
  //         });            
  //     }
  // }

  // bar = () => {
  //     var fakeTx = []
  //     var tx = {
  //         time: 123,
  //         hash: "abc123",
  //         result: 1111,
  //         balance: 9999
  //     }
  //     fakeTx.push(tx);
  //     return fakeTx;
  // }

  // testWebSocket() {
  //     var websocket = new WebSocket("ws://ws.blockchain.info/inv");
  //     websocket.onopen = (evt) => {
  //         console.log('Connection open', evt);
  //         var msg1 = {
  //             op: "unconfirmed_sub"
  //         }

  //         // subscribing to an address
  //         var msg2 = {
  //             "op": "addr_sub",
  //             "addr": "1H6ZZpRmMnrw8ytepV3BYwMjYYnEkWDqVP"
  //         }
  //         websocket.send(JSON.stringify(msg1));
  //     }
  //     websocket.onclose = function (evt) { console.log('Connection closed') };
  //     websocket.onmessage = (evt) => {
  //         this.invokeTestFunc();
  //     };
  //     websocket.onerror = function (evt) { console.log('Error occurred', evt) };
  // }

  getBalance = () => {
    // const addr = '17CUX3NGq2EeLwjXHAU95y3TjoRRvBmrbR'
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
