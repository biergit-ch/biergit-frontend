import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Theme, Container, makeStyles, createStyles } from '@material-ui/core';

import AppNavBar from './components/common/AppNavBar';
import BottomNav from './components/common/BottomNav';
import NoMatch from './components/common/NoMatch';

import Index from './components/index/Index'
import Groups from './components/group/Groups'
import Profile from './components/profile/Profile';
import About from './components/about/About';
import Login from './components/login/Login';

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
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
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
      <Suspense fallback="loading">
        <Router>
          <header>
            <nav>
              <AppNavBar />
            </nav>
          </header>
          <main className={classes.main}>
            <Container className={classes.rootContainer}>
              <Switch>
                <Route path="/" exact component={Index} />
                <Route path="/login" component={Login} />
                <Route path="/groups" component={Groups} />
                <Route path="/profile" component={Profile} />
                <Route path="/about" component={About} />
                <Route component={NoMatch} />
              </Switch>
            </Container>
          </main>
          <footer className={classes.footer}>
            <Container maxWidth="xl" className={classes.madeWithLove}>
              Made with <span role="img" aria-label="heart">❤️</span> in <b>Zurich</b>
            </Container>
            <BottomNav />
          </footer>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
