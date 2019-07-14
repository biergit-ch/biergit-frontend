import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';

import mockData from '../../mock-data.json';

interface UserProps {
    userId: string;
}

const GroupUser: React.FC<UserProps> = (props: UserProps) => {

    const user = mockData.users.filter(user => user.user_id === props.userId)[0];
    return (
        <ListItem key={user.user_id}>
            <ListItemAvatar>
                <PersonIcon />
            </ListItemAvatar>
            <ListItemText primary={user.user_id} />
            <ListItemSecondaryAction>
                0 (Bier Empty)
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default GroupUser;