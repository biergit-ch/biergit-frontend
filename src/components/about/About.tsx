import React from 'react';
import { Typography, Link, makeStyles, Theme, createStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        aboutLinkItem: {
            marginTop: theme.spacing(4),
        },
    })
);

const About: React.FC = () => {
    const classes = useStyles({});

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h2">ABOUT</Typography>
            </Grid>
            <Grid item xs={12} className={classes.aboutLinkItem}>
                <Link variant="h3" href='/about/privacypolicy'>Privacy Policy</Link>
            </Grid>
        </Grid>
    )
}

export default About;