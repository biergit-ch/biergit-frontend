import React from 'react';
import { Container, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {

        }
    })
);

const Index: React.FC = () => {
    const classes = useStyles({});
    const { t } = useTranslation();

    return (
        <Container className={classes.root}>
            <Typography variant="h2">{t('index_welcome')}</Typography>
        </Container>
    );
}

export default Index;