import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch, RouteComponentProps } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Container, Theme, makeStyles, createStyles, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import mockData from "./../../mock-data.json";

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
    const { t } = useTranslation();

    const currentUser = mockData.users[0];
    const groups = mockData.groups.filter(group => group.members.some(userId => userId === currentUser.user_id));

    return (
        <Switch>
            <Route exact path={props.match.path}>
                <Container className={classes.root} maxWidth="sm">
                    <Typography variant="h2">{t('groups_header')}</Typography>
                    <List>{(
                        groups.map(group =>
                            <ListItem key={group.id} button component={Link} to={"/groups/" + group.id}>
                                <ListItemText primary={group.name} />
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </Route>
            <Route path={`${props.match.path}/:groupId`} component={Group} />
        </Switch>
    )
}

export default Groups;