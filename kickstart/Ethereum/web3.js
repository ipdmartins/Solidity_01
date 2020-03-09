import Web3 from 'web3';

let web3;

//it gets provider provided by metamask, but the window object cannot run on NextJS server
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    //we're in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else {
    //we're on the server OR the user isn't running Metamask
    const provider = new Web3.providers.HttpProvider(
        'rinkeby.infura.io/v3/78f3cb61a69a40a1994d59b48c0d2005');
    web3 = new Web3(provider);
}


export default web3;