import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Theme, Container, makeStyles, createStyles } from '@material-ui/core';

import AppNavBar from './components/common/AppNavBar';
import BottomNav from './components/common/BottomNav';
import NoMatch from './components/common/NoMatch';

import Index from './components/index/Index'
import Groups from './components/group/Groups'
import Profile from './components/profile/Profile';
import About from './components/about/About';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    rootContainer: {
      textAlign: 'center',
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    main: {
      marginBottom: theme.spacing(3),
    },
    madeWithLove: {
      backgroundColor: theme.palette.primary.dark,
      padding: theme.spacing(2),
      textAlign: 'center',
      verticalAlign: 'middle',
      color: theme.palette.primary.contrastText,
      minHeight: '5vh',
      marginTop: 'auto',
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles({});

  return (
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
            <Route path="/groups" component={Groups} />
            <Route path="/profile" component={Profile} />
            <Route path="/about" component={About} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
        <Container maxWidth="xl" className={classes.madeWithLove}>
          Made with <span role="img" aria-label="heart">❤️</span> in <b>Zurich</b>
        </Container>
      </main>
      <footer>
        <BottomNav />
      </footer>
    </Router>
  );
}

export default App;
