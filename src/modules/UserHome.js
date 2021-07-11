import React from 'react';
import { Flex } from 'skylight-react';

const UserHome = ({ email }) => {
    return (
        <Flex center middle height="100vh" width="100%" gap={1}>
            <h3>Hello, {email}.</h3>
            <p>This route is for protected users :~)</p>
        </Flex>
    );
}
 
export default UserHome;
