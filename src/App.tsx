import React from 'react';
import { Theme, Container, makeStyles, createStyles } from '@material-ui/core';
import { Router } from 'react-router-dom';

import AppNavBar from './components/common/AppNavBar';
import BottomNav from './components/common/BottomNav';
import Routes from './Routes';
import history from './history';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    rootContainer: {
      textAlign: 'center',
    },
    main: {
      flexGrow: 1,
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    toolbar: theme.mixins.toolbar,
    madeWithLove: {
      backgroundColor: theme.palette.primary.dark,
      padding: theme.spacing(2),
      textAlign: 'center',
      verticalAlign: 'middle',
      color: theme.palette.primary.contrastText,
      minHeight: '5vh',
      marginTop: 'auto',
      width: '100%',
    },
    footer: {
      marginTop: 'auto',
      backgroundColor: 'white',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Router history={history}>
        <header>
          <nav>
            <AppNavBar />
          </nav>
        </header>
        <main className={classes.main}>
          <div className={classes.toolbar} />
          <Container className={classes.rootContainer}>
            <Routes />
          </Container>
        </main>
        <footer className={classes.footer}>
          <Container maxWidth="xl" className={classes.madeWithLove}>
            Made with <span role="img" aria-label="heart">❤️</span> in <b>Zurich</b>
          </Container>
          <BottomNav />
        </footer>
      </Router>
    </div>
  );
}

export default App;
