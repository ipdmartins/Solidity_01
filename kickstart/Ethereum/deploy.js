const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

//contains the 12 Mnemonic words, the Infura network.
const provider = new HDWalletProvider(
    'evoke inmate life crunch glory state situate safe stairs cement mule lift',
    'rinkeby.infura.io/v3/78f3cb61a69a40a1994d59b48c0d2005');

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface)).
        deploy({ data: compiledFactory.bytecode, arguments: ['Hello World'] }).
        send({ from: accounts[0], gas: '1000000' });
    console.log('Contract deployed to', result.options.address);
};
deploy();