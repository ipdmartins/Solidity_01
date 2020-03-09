// pragma is a key word that gives instructions do the compiler on how to treat the cod. Then, this line uniquely controls the version.
pragma solidity ^0.6.1;

contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint256 minimun) public {
        address newCampaign = new Campaign(minimun, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }
}

//the key word 'contract' defines a new contract. It's similar to classes in Java with a number of variables and methods
contract Campaign {
    struct Request {
        string description;
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals; //reference type are not initialized as common variables
    }

    Request[] public requests;
    address public manager; //contract's creator
    uint256 public minimumContribution;
    mapping(address => bool) public approvers; //addresses of people who have entered
    uint256 public approversCount;

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    //constructor function
    constructor(uint256 minimun, address creator) public {
        manager = creator; //msg is a global variable created automatically with certain attributes.
        minimumContribution = minimun;
    }

    //puts a player into the Lottery
    function contribute() public payable {
        require(msg.value > minimumContribution); //demands a value to continue, otherwise the flow will break
        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string description, uint256 value, address recipient)
        public
        restricted
    {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint256 index) public {
        Request storage request = requests[index];

        require(approvers[msg.sender]); //make sure that a address already contributed to the contract
        require(!request.approvals[msg.sender]); //make sure that this address has not already voted.
        request.approvals[msg.sender] = true; //contributor already voted now
        request.approvalCount++;
    }

    function finalizeRequest(uint256 index) public restricted {
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary()
        public
        view
        returns (uint256, uint256, uint256, uint256, address)
    {
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }

}
