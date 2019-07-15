import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, makeStyles, createStyles, Theme, Avatar } from '@material-ui/core';

import { AppState } from '../../store';
import { useSelector } from 'react-redux';

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

interface UserProps {
    userId: string;
}

const GroupUser: React.FC<UserProps> = (props: UserProps) => {
    const classes = useStyles();
    const user = useSelector((state: AppState) => state.user.users.filter(user => user.user_id === props.userId)[0]);
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