import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';//taking the compiled contract

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface),
    'THE CONTRACT NUMBER THAT I DONT HAVE ONCE MY CODE DOESNT COMPILE');

export default instance;