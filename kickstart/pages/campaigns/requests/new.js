import React, { Component } from 'react';
import { Form, Button, Message, Input, Label } from 'semantic-ui-react';
import Campaign from '../../../Ethereum/campaign';
import web3 from '../../../Ethereum/web3';
import { Link, Router } from '../../../routes';
import Layout from '../../../components/Layout';

class RequestNew extends Component {
    state = {
        value: '',
        description ='',
        recipient =  '',
        loading = false,
        errorMessage: ''
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        return { address };
    }

    onSubmit = async event => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;
        this.setState({ loading: true, errorMessage: '' });

        try {
            const accounts = web3.eth.getAccounts();
            await campaign.methods.createRequest(
                description,
                web3.utils.toWei(value, 'ether'),
                recipient
            ).send({ from: accounts[0] });
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch (error) {
            this.state({ errorMessage: error.message })
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        <Button primary>Back</Button>
                    </a>
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <Label>Description</Label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>Value in Ether</Label>
                        <Input
                            value={this.state.value}
                            onChange={event => this.setState({ value: event.target.value })}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Label>Recipient</Label>
                        <Input
                            value={this.state.recipient}
                            onChange={event => this.setState({ recipient: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header='Oops!' content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
            </Layout>

        );
    }
}

export default RequestNew;