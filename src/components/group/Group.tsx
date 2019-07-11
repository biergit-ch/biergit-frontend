
import React from 'react';
import { RouteComponentProps } from "react-router";
import { Container, makeStyles, Theme, createStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            
        },
    })
);

interface GroupIdentificable { groupId: string; }

const Group: React.FC<RouteComponentProps<GroupIdentificable>> = (props: RouteComponentProps<GroupIdentificable>) => {
    const classes = useStyles({});
    return (
        <Container className={classes.root}>
            <div>
                <Typography variant="h1">{props.match.params.groupId}</Typography>
                <Typography variant="h4">This is the group content.</Typography>
            </div>
        </Container>
    );
}

export default Group;
