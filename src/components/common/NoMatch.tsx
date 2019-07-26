import React from 'react';
import { Container, makeStyles, Theme, createStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    return (
        <Container className={classes.root}>
            <h3>{t('common_nomatch')} <code>{location.pathname}</code></h3>
        </Container>
    );
}

export default NoMatch