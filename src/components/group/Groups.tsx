import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Switch, RouteComponentProps } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Container, Theme, makeStyles, createStyles, Typography, List, ListItem, ListItemText, Fab, Grid, Avatar, ListItemAvatar, InputBase } from '@material-ui/core';
import { fade } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import mockData from "./../../mock-data.json";

import Group from './Group';
import history from '../../history';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
        },
        addButton: {
            margin: theme.spacing(1),
        },
        groupAvatar: {
            margin: 10
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
    })
);

const Groups: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const classes = useStyles();
    const { t } = useTranslation();

    const currentUser = mockData.users[0];
    const groups = mockData.groups.filter(group => group.members.some(userId => userId === currentUser.user_id));

    const createGroup = () => {
        history.push('/creategroup');
    }

    return (
        <Switch>
            <Route exact path={props.match.path}>
                <Container className={classes.root} maxWidth="sm">
                    <Grid container spacing={3}>
                        <Grid item xs={8}>
                            <Typography variant="h6">{t('groups_header')}</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'Search' }}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2">{t('group_creategroup')}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ExpandMoreIcon />
                        </Grid>
                        <Grid item xs={12}>
                            <Fab size="medium" color="secondary" aria-label="Add" className={classes.addButton} onClick={createGroup}>
                                <AddIcon />
                            </Fab>
                        </Grid>
                    </Grid>
                </Container>
            </Route>
            <Route path={`${props.match.path}/:groupId`} component={Group} />
        </Switch>
    )
}

export default Groups;