import React from 'react';
import { ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core';

import PersonIcon from '@material-ui/icons/Person';

import mockData from '../../mock-data.json';

interface UserProps {
    userId: string;
}

const CreateGroupUser: React.FC<UserProps> = (props: UserProps) => {

    const [checked, setChecked] = React.useState(["1"]);


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
                <PersonIcon />
            </ListItemAvatar>
            <ListItemText primary={user.user_id} />
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