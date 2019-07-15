import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Checkbox, Avatar, makeStyles, Theme, createStyles } from '@material-ui/core';

import mockData from '../../mock-data.json';

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

const CreateGroupUser: React.FC<UserProps> = (props: UserProps) => {

    const [checked, setChecked] = React.useState(["1"]);
    const classes = useStyles();

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const user = mockData.users.filter(user => user.user_id === props.userId)[0];
    const labelId = `checkbox-list-secondary-label-${user.user_id}`;
    return (
        <ListItem key={user.user_id}>
            <ListItemAvatar>
                <Avatar src={user.picture} alt="Group Logo" className={classes.userAvatar} />
            </ListItemAvatar>
            <ListItemText primary={user.name} className={classes.userName} />
            <ListItemSecondaryAction>
                <Checkbox
                    edge="end"
                    onChange={handleToggle(user.user_id)}
                    checked={checked.indexOf(user.user_id) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default CreateGroupUser;