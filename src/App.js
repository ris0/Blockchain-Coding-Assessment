import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      balance: 0
    }
  }  

  componentDidMount = () => {
    this.getBalance();
  }

  getBalance = () => {
    var addr = '17CUX3NGq2EeLwjXHAU95y3TjoRRvBmrbR'
    var url = `https://blockchain.info/multiaddr?cors=true&active=${addr}`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        const finalBalance = data.wallet.final_balance;
        const convertedBitcoinValue = finalBalance/100000000;
        const convertedDollarValue = convertedBitcoinValue * 8880;
        this.setState({ 
          balance: convertedDollarValue.toFixed(2)
        })
      })
  };

  render() {
    // console.log('test', this.state.balance);
    console.log('props', this.props);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.balance}
        </p>
      </div>
    );
  }
}

export default App;
