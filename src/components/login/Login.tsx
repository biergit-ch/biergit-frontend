import React from 'react';
import { withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '../../react-auth0-spa';

import { Container, createStyles, makeStyles, Theme, Typography, Button, Grid } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import logo from './../common/images/biergit-ch.png';
import Loading from '../common/Loading';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        },
        loginButton: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            textTransform: 'uppercase',
        },
    })
);

const Login: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const classes = useStyles({});
    const { t } = useTranslation();
    const { loginWithRedirect, loading, isAuthenticated }: any = useAuth0();

    const signIn = async () => {
        await loginWithRedirect({
            appState: { targetUrl: '/home' }
        });
    }

    return (
        loading === true ? <Loading /> : isAuthenticated === false ?
            <Container className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <img src={logo} alt="logo" height="100" />
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
                        <Button className={classes.loginButton} onClick={signIn}>{t('common_signin')}</Button>
                    </Grid>
                </Grid>
            </Container> : <Redirect to='/home' />
    );
}

export default withRouter(Login);