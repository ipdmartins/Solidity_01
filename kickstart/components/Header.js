import React from 'react';
import { Menu } from 'semantic-ui-react';
//Link is a React component that allows to render anchor tags and navigate around the app
import { Link } from '../routes';

export default () => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link route='/'>
                <a className='item'>CrowdCoin</a>
            </Link>
            <Menu.Menu position='right'>
                <Link route='/'>
                    <a className='item'>Campaigns</a>
                </Link>
                <Link route='/campaigns/new'>
                    <a className='item'>+</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};