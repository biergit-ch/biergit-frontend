
import React from 'react';
import { RouteComponentProps } from "react-router";
import { Container, makeStyles, Theme, createStyles, Typography, List } from '@material-ui/core';

import GroupUser from '../user/GroupUser';
import { AppState } from '../../store';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        memberList: {
            marginTop: theme.spacing(2)
        },
    })
);

interface GroupIdentificable { groupId: string; }

interface GroupProps extends RouteComponentProps<GroupIdentificable> {
}

const Group: React.FC<GroupProps> = (props: GroupProps) => {
    const classes = useStyles({});
    const actGroup = useSelector((state: AppState) => state.group.groups.filter(g => g.id === props.match.params.groupId)[0]);
    return (
        <Container maxWidth="sm">
            <div>
                <Typography variant="h4">{actGroup.name}</Typography>

                <List className={classes.memberList}>
                    {(
                        actGroup.members.map(userId =>
                            <GroupUser userId={userId} />
                        ))}
                </List>
            </div>
        </Container>
    );
}

export default Group;
