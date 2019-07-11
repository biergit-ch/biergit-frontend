import React from 'react';
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing(20),
        },
    })
);

const NoMatch = ({ location }: any) => {
    const classes = useStyles({});
    return (
        <Container className={classes.root}>
            <h3>No match for <code>{location.pathname}</code></h3>
        </Container>
    );
}

export default NoMatch