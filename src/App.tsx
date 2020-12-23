import React, { useEffect, useContext, Suspense } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Router } from 'react-router-dom';

import Routes from './routes/Routes';
import history from './history';
import Navigation from './components/navigation/Navigation';
import { UserContext } from './providers/UserContextProvider';
import { Box } from '@material-ui/core';
import { useBiergitApiClient } from './api/useBiergitApiClient';
import { useAuth0 } from './auth/auth0-spa';
import { Loading } from './common/components/Loading';
import theme from './theme';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexGrow: 1,
    },
    rootContainer: {},
    toolbar: theme.mixins.toolbar,
    footer: {
      marginTop: 'auto',
      backgroundColor: 'white',
      width: '100%',
      position: 'fixed',
      bottom: 0,
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles(theme);
  const { getCurrentUser } = useBiergitApiClient();
  const { setCurrentUser } = useContext(UserContext);
  const { loading, isAuthenticated } = useAuth0();

  useEffect(() => {
    const getUserMe = async (): Promise<void> => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };
    if (!loading && isAuthenticated && setCurrentUser != null) {
      getUserMe();
    }
  }, [loading, isAuthenticated, setCurrentUser, getCurrentUser]);

  return (
    <Suspense fallback={<Loading />}>
      <div className={classes.root}>
        <Router history={history}>
          <header>
            <Navigation />
          </header>
          <main style={{ width: '100%' }}>
            <div className={classes.toolbar} />
            <Box className={classes.rootContainer}>
              <Routes />
            </Box>
          </main>
          <footer className={classes.footer}>{/* Footer */}</footer>
        </Router>
      </div>
    </Suspense>
  );
};

export default App;
