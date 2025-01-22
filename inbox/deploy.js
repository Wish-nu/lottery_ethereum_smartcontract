const HDWalletProvider = require('@truffle/hdwallet-provider');
const { Web3 } = require('web3');
//updated web3 and hdwallet-provider imports added for convenience
// deploy code will go here

const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'ring apple etc', //enter your mneumonic here
    'enter sepolia api key link' //sepolia api key
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account', accounts [0]);
    
    const result = await new web3.eth.Contract(JSON.parse(interface)) //abi key
    .deploy({
        data: bytecode, arguments: ['Hola! Buenos Dias'] //message 
        })
    .send({ gas: '1000000', from: accounts [0]});  // gas and which account

    console.log('Contract deployed to', result.options.address);
    provider.engine.stop()

};
deploy();


//Contract deployed to 0x46B35D73DeE5D4653C17D9d84a55C55209712d4a - contract address