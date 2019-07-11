import React from 'react';
import { Container, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    })
);

const Index: React.FC = () => {
    const classes = useStyles({});

    return (
        <Container className={classes.root}>
            <Typography variant="h2">INDEX</Typography>
        </Container>
    );
}

export default Index;