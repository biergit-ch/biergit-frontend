import React, { useState } from 'react';
import { Container, makeStyles, Theme, createStyles, Typography, List, Button } from '@material-ui/core';

import CreateGroupUser from '../user/CreateGroupUser';
import { addGroup } from '../../store/group/actions';
import { useDispatch, useSelector } from 'react-redux';
import { GroupModel } from '../../models/index';
import { AppState } from '../../store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
        },
        createGroupButton: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        },
    })
);

interface CreateGroupProps {
    addGroup: typeof addGroup;
}

const CreateGroup: React.FC<CreateGroupProps> = (props: CreateGroupProps) => {
    const classes = useStyles();

    const [checkedUsers, setCheckedUsers] = useState<string[]>([]);

    const dispatch = useDispatch();
    const currentUser = useSelector((state: AppState) => state.user.currentUser);
    const users = useSelector((state: AppState) => state.user.users.filter(user => user.user_id !== currentUser.user_id));

    const create = () => {
        const newGroup: GroupModel = {
            id: "d",
            name: "New Group",
            picture: "",
            members: [...checkedUsers, currentUser.user_id]
        }
        dispatch(addGroup(newGroup));
    }

    const toggleCheckedUser = (userId: string) => {
        const currentIndex = checkedUsers.indexOf(userId);
        const newChecked = [...checkedUsers];

        if (currentIndex === -1) {
            newChecked.push(userId);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setCheckedUsers(newChecked);
    }

    return (
        <Container maxWidth="sm" className={classes.root}>
            <Typography variant="h6">CREATE NEW GROUP</Typography>
            <List>
                {users.map(user =>
                    <CreateGroupUser userId={user.user_id} toggleCheckedUser={toggleCheckedUser} />
                )}
            </List>

            <Button className={classes.createGroupButton} onClick={create}>CREATE</Button>
        </Container>
    )
}

export default CreateGroup;