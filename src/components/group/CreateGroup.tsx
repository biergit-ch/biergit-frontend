import React from 'react';
import { Container, makeStyles, Theme, createStyles, Typography, List } from '@material-ui/core';

import mockData from './../../mock-data.json';
import CreateGroupUser from '../user/CreateGroupUser';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
        },
    })
);

const CreateGroup: React.FC = () => {
    const classes = useStyles();

    const currentUser = mockData.users[0];
    const users = mockData.users.filter(user => user.user_id !== currentUser.user_id);

    return (
        <Container maxWidth="sm" className={classes.root}>
            <Typography variant="h6">CREATE NEW GROUP</Typography>
            <List>
                {users.map(user =>
                    <CreateGroupUser userId={user.user_id} />
                )}
            </List>
        </Container>
    )
}

export default CreateGroup;