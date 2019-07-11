import React from 'react';
import { Container, createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            textAlign: 'center',
            paddingTop: theme.spacing(20),
        },
    })
);

const Index: React.FC = () => {
    const classes = useStyles({});

    return (
        <Container className={classes.root}>
            INDEX
        </Container>
    );
}

export default Index;