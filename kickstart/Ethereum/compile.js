const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');//short abreviation for file system

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);//serves to clear out the folder

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);//check if the directory exists, if not, it creates a new one

console.log(output);
for (let contract in output) {//write a json for some specified file in the folder
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'), output[contract]
    );
}