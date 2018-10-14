import React, { Component } from 'react';
import web3 from './web3';
import lotteryContract from './lotteryContract';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numPlayers: 0,
      prizePool: 0,
      loading: true,
    };

    this.fetchContractDataIntoState = this.fetchContractDataIntoState.bind(this);
  }
  componentDidMount() {
    // NOTE: this calls setState() with the fetched contractState
    this.fetchContractDataIntoState();
  }

  async fetchContractDataIntoState() {
    const [manager, balance, numPlayers] = await Promise.all([
      lotteryContract.methods.manager().call(),
      web3.eth.getBalance(lotteryContract.options.address),
      lotteryContract.methods.getNumPlayers().call(),
    ]);

    this.setState({
      manager,
      prizePool: balance,
      numPlayers,
      loading: false,
    });
  }

  render() {
    const { manager, numPlayers, prizePool, loading } = this.state;
    if(loading) {
      return <div className="App">Loading...</div>;
    }
    return (
      <div className="App">
        <div>Manager: {manager}</div>
        <div>Number of players: {numPlayers}</div>
        <div>Prize pool: {prizePool} ETH!</div>

        <div>
          <h3>Enter to win!</h3>
          <button type="button">Enter</button>
        </div>
      </div>
    );
  }
}

export default App;
