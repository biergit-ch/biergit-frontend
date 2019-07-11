import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch, RouteComponentProps } from 'react-router';
import { Container, Theme, makeStyles, createStyles, Typography, List, ListItem, ListItemText } from '@material-ui/core';

import Group from './Group';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
        },
    })
);

const Groups: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const classes = useStyles();
    return (
        <Switch>
            <Route exact path={props.match.path}>
                <Container className={classes.root}>
                    <Typography variant="h2">GROUPS</Typography>
                    <List>
                        <ListItem button component={Link} to="/groups/2">
                            <ListItemText primary="Group 2" />
                        </ListItem>
                        <ListItem button component={Link} to="/groups/12">
                            <ListItemText primary="Group 12" />
                        </ListItem>
                        <ListItem button component={Link} to="/groups/22">
                            <ListItemText primary="Group 22" />
                        </ListItem>
                    </List>
                </Container>
            </Route>
            <Route path={`${props.match.path}/:groupId`} component={Group} />
        </Switch>
    )
}

export default Groups;