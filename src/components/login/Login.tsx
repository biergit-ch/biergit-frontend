import React from 'react';
import { Container, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { useTranslation } from 'react-i18next';

import logo from './../common/images/biergit-ch.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    })
);

const Login: React.FC = () => {
    const classes = useStyles({});
    const { t } = useTranslation();

    return (
        <Container className={classes.root}>
            <img src={logo} alt="logo" />
            <Typography variant="h2">{t('login_welcome')}</Typography>
        </Container>
    );
}

export default Login;