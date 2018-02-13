import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      balance: 0,
      totalReceived: 0,
      totalTransactions: 0,
      txs: []
    }
  }  

  componentDidMount = () => {
    this.getBalance();
  }

  convertToBtc = (balance) => {
    return balance/100000000;
  }

  getBalance = () => {
    var addr = '17CUX3NGq2EeLwjXHAU95y3TjoRRvBmrbR'
    var url = `https://blockchain.info/multiaddr?cors=true&active=${addr}`;
    // var url2 = `https://blockchain.info/rawaddr/${addr}?cors=true`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const finalBalance = this.convertToBtc(data.wallet.final_balance);
        const totalReceived = this.convertToBtc(data.wallet.total_received);
        const totalTransactions = data.wallet.n_tx;
        const arrayOfTxs = [];

        for (let i = 0; i < data.txs.length; i++) {
          arrayOfTxs.push(data.txs[i]);
        };

        this.setState({ 
          balance: finalBalance,
          totalReceived: totalReceived,
          totalTransactions: totalTransactions,
          txs: arrayOfTxs
        })

        console.log(data);
      })
  };

  render() {
    // console.log('balance', this.state.balance);
    // console.log('totalTrans', this.state.totalTransactions);
    // console.log('received', this.state.totalReceived);
    // console.log(this.state.txs.length);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className="App-intro">
          Summary
          <div>{this.state.totalTransactions}</div>
          <div>{this.state.balance}</div>
          <div>{this.state.totalReceived}</div>
        </div>

        <div className="App-intro">
          Transactions
          <div>
            {this.state.txs.map((tx, idx) => {
              return (<span key={idx}> {tx.hash} </span>)
            })}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
