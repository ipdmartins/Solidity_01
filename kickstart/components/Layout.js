import React from 'react';
import Container from 'semantic-ui-react';
import Header from './Header';
import Head from './Header';

export default props => {
    return (
        <Container>
            <Head>s
                <link
                    rel="stylesheet"
                    href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
                />
            </Head>
            <Header />
            {props.children}
        </Container>
    );
};