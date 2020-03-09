import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from '../Ethereum/web3';
import Campaign from '../Ethereum/campaign';

class RequestRow extends Component {
    onApprove = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounts[0]
        });
    };

    onFinalize = async () => {
        const campaign = Campaign(this.props.address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounts[0]
        });
    };



    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const readyToFinalze = request.approvalCount > approversCount / 2;

        return (//disabled true makes the line gray and positive highlight the line
            <Row disabled={request.complete} positive={readyToFinalze && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.FromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount}/{approversCount}</Cell>
                <Cell>
                    {request.complete ? null : (//complete is a boolean from the contract
                        <Button color='green' basic onClick={this.onApprove}>Approve</Button>
                    )}
                </Cell>
                <Cell>
                    {request.complete ? null : (//complete is a boolean from the contract
                        <Button color='teal' basic onClick={this.onFinalize}>Finalize</Button>
                    )}
                </Cell>
            </Row>
        );
    }
}

export default RequestRow;