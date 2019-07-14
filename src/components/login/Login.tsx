import React from 'react';
import { Container, createStyles, makeStyles, Theme, Typography, Button, Grid } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useTranslation } from 'react-i18next';

import logo from './../common/images/biergit-ch.png';
import { useAuth0 } from '../../react-auth0-spa';
import { withRouter, RouteComponentProps } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        loginButton: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        },
    })
);

const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const classes = useStyles({});
    const { t } = useTranslation();
    const { loginWithPopup }: any = useAuth0();

    const signIn = async () => {
        await loginWithPopup();
        props.history.push('/')
    }

    return (
        <Container className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <img src={logo} alt="logo" height="100"/>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">{t('login_welcome')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">{t('login_signin')}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <ExpandMoreIcon />
                </Grid>
                <Grid item xs={12}>
                    <Button className={classes.loginButton} onClick={signIn}>SIGN IN</Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default withRouter(Login);