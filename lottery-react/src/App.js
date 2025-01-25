import logo from "./logo.svg";
import "./App.css";
import React from "react";
import web3 from "./web3";  //importing own version of web3
import lottery from "./lottery"; //interacting with the contract


class App extends React.Component {         //app component rendered to the screen
  state = {
    manager: '', 
    players: [],
    balance: '',
    value: '',
    message: ''
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call(); //metamask provider -default account (making a call to the network)
    const players = await lottery.methods.getPlayers().call(); //to return every player that has entered
    const balance = await web3.eth.getBalance(lottery.options.address); //get balance on the lottery contract

    this.setState({ manager, players, balance});  //set that address as the manager
  }

  onSubmit = async (event) => {   //when user submits the form
    event.preventDefault();

    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting for the transaction to be successful'});  // when txn ia processing
    
    await lottery.methods.enter().send({    //when txn is sent
      from: accounts[0],    //first account will be used to enter the lottery
      value: web3.utils.toWei(this.state.value, 'ether')
    });

    this.setState({ message: 'Congratulations, You have entered!'});

  };

  onClick = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: 'Waiting for the transaction to be successful'});

    await lottery.methods.pickWinner().send({
      from: accounts[0]
    });

    this.setState({ message: 'A winner has been picked!'});
  };


  render() {      //app component calls render
    
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          This contract is managed by {this.state.manager} 
        </p>
        <p>
        There are currently {this.state.players.length} people entered,
        competing to win {web3.utils.fromWei(this.state.balance, 'ether')} ether!
        </p>

        <hr />

        <form onSubmit={this.onSubmit}>
          <h4>
            Go ahead and try your luck!
          </h4>
          <div>
            <label>Amount of ETH to enter</label>
            <input 
              value={this.state.value}
              onChange={event => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>

        <hr />

        <h4>Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner!</button>

        <hr />



        <h1>{this.state.message}</h1>
      </div>
    );
  }
}
export default App;

