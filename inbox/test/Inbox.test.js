const assert = require('assert');
const ganache = require('ganache');
const { Web3 } = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox; 
//const INITIAL_STRING = 'Hola!';

beforeEach(async () => {
    //get a list of all accounts
    accounts = await web3.eth.getAccounts();
    //use one of these accounts to deploy

    inbox = await new web3.eth.Contract(JSON.parse(interface))  //methods inbox contract has
    .deploy({ data: bytecode, arguments: ['Hola!'] })   //instructing web3 to deploy a contract
    .send({ from: accounts[0], gas: '1000000'});        //instructing web3 to send out a transaction

});


describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hola!');
    });

    it('can change the message', async () => {
       await inbox.methods.setMessage('ciao').send({ from: accounts[0] });
        const message = await inbox.methods.message().call();
        assert.equal(message, 'ciao');
    });
});

// updated ganache and web3 imports added for convenience

// contract test code will go here


/* mocha test :

class Car {
    park() {
        return 'stopped';
    }
    drive() {
        return 'vroom';
    }
}
    let car;

beforeEach(() => {
    car = new Car();
});

describe('Car', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped');
    });

    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
    });
}); */