import React from 'react';
import { useTranslation } from 'react-i18next';

import { Container, createStyles, makeStyles, Theme, Typography, Grid, Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import logo from './../common/images/biergit-ch.png';
import history from '../../history';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        addButton: {
            margin: theme.spacing(1),
        }
    })
);


const Index: React.FC = () => {
    const classes = useStyles({});
    const { t } = useTranslation();

    const currentUser = useSelector((state: AppState) => state.user.currentUser);

    const createGroup = () => {
        history.push('/groups/create/members');
    }

    return (
        <Container maxWidth="sm">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <img src={logo} alt="logo" height="100" />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6">{t('index_cheers')} {currentUser.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">{t('index_invite')}</Typography>
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
    );
}

export default Index;