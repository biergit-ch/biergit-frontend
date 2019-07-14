
import React from 'react';
import { RouteComponentProps } from "react-router";
import { Container, makeStyles, Theme, createStyles, Typography, List } from '@material-ui/core';

import mockData from './../../mock-data.json';
import GroupUser from '../user/GroupUser';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        memberList: {
            marginTop: theme.spacing(2)
        },
    })
);

interface GroupIdentificable { groupId: string; }

const Group: React.FC<RouteComponentProps<GroupIdentificable>> = (props: RouteComponentProps<GroupIdentificable>) => {
    const classes = useStyles({});
    const actGroup = mockData.groups.filter(g => g.id === props.match.params.groupId)[0];
    return (
        <Container maxWidth="sm">
            <div>
                <Typography variant="h4">{actGroup.id}</Typography>

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
