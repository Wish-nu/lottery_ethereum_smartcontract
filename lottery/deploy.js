const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
//updated web3 and hdwallet-provider imports added for convenience
// deploy code will go here

const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'lunch blah blah ', //DO NOT SHARE-enter your mneumonic here
    'sepolia api key link' //sepolia api key
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts [0]);
    
    const result = await new web3.eth.Contract(JSON.parse(interface)) //abi key
    .deploy({ data: '0x' + bytecode })
    .send({ from: accounts [0]});  // gas and which account

    console.log(interface); //ABI
    console.log('Contract deployed to', result.options.address);    // need to get the address of the deployed contract
    provider.engine.stop()

};
deploy();


//Contract deployed to 0x953eaa425CCD1d80B325dE08cc577Ecb48ec5700- contract address