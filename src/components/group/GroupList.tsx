import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemText, Avatar, ListItemAvatar, createStyles, makeStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        groupAvatar: {
            margin: 10
        },
    })
);

const GroupList: React.FC = () => {
    const classes = useStyles();

    const currentUser = useSelector((state: AppState) => state.user.currentUser);
    const groups = useSelector((state: AppState) => state.group.groups.filter(group => group.members.some(userId => userId === currentUser.user_id)));

    return (
        <List>{(
            groups.map(group =>
                <ListItem key={group.id} button component={Link} to={"/groups/" + group.id}>
                    <ListItemAvatar>
                        <Avatar src={group.picture} alt="Group Logo" className={classes.groupAvatar} />
                    </ListItemAvatar>
                    <ListItemText primary={group.name} />
                </ListItem>
            ))}
        </List>
    )
}

export default GroupList;