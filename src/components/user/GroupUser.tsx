import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, makeStyles, createStyles, Theme, Avatar } from '@material-ui/core';

import mockData from '../../mock-data.json';

interface UserProps {
    userId: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userAvatar: {
            margin: 10,
        },
        userName: {
            margin: 10,
        },
    })
)

const GroupUser: React.FC<UserProps> = (props: UserProps) => {
    const classes = useStyles();
    const user = mockData.users.filter(user => user.user_id === props.userId)[0];
    return (
        <ListItem key={user.user_id}>
            <ListItemAvatar>
                <Avatar src={user.picture} alt="Group Logo" className={classes.userAvatar} />
            </ListItemAvatar>
            <ListItemText primary={user.name} className={classes.userName} />
            <ListItemSecondaryAction>
                0 (Bier Empty)
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default GroupUser;