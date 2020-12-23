import React, { useContext } from 'react';

import { useAuth0 } from '../../auth/auth0-spa';
import { Typography, Button, Container } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import theme from '../../theme';
import { useTranslation } from 'react-i18next';
import { TitlebarContext } from '../../providers/TitlebarContextProvider';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    landingContainer: {
      minHeight: '100vh',
      paddingTop: theme.spacing(3),
    },
  }),
);

export const LandingPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();
  const { setTitle } = useContext(TitlebarContext);
  const classes = useStyles(theme);
  const login = (): void => {
    loginWithRedirect({
      audience: process.env.REACT_APP_AUTH_AUDIENCE,
    });
  };
  setTitle(t('common_home'));

  return (
    <Container
      style={{ minHeight: '100vh' }}
      className={classes.landingContainer}
    >
      <Typography variant="h5">{t('landing_welcome')}</Typography>
      <Typography>{t('landing_connect')}</Typography>
      <Typography variant="h6">{t('landing_ourvision')}</Typography>
      <Typography>{t('landing_visiontext')}</Typography>
      <br />
      <Button onClick={(): void => login()} variant="contained" color="primary">
        {t('landing_signupnow')}
      </Button>
    </Container>
  );
};
