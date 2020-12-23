/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import theme from '../../theme';
import { CallToAction } from '../cta/CallToAction';
import { ReactComponent as BeerCheers } from '../../common/assets/beer_cheers.svg';
import history from '../../history';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      flexGrow: 1,
      textAlign: 'center',
    },
    gridItem: {
      paddingTop: theme.spacing(8),
    },
    beerImg: {
      height: 150,
      width: 150,
    },
  }),
);

export const Intro: React.FC = () => {
  const classes = useStyles(theme);
  const { t } = useTranslation();
  return (
    <Grid
      className={classes.root}
      container
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} className={classes.gridItem}>
        <Typography variant="h4">{t('intro_welcome')}</Typography>
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <BeerCheers className={classes.beerImg} />
      </Grid>
      <Grid item xs={12} className={classes.gridItem}>
        <Typography>{t('intro_spendbeer')}</Typography>
      </Grid>

      <CallToAction
        icon={<img src={'/images/beer_cheers.svg'} alt="friends" />}
        tooltip={t('group_spendbeer')}
        action={(): void => history.push('/friends')}
      />
    </Grid>
  );
};
