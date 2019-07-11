import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Theme, Container, makeStyles, createStyles } from '@material-ui/core';
import AppNavBar from './components/common/AppNavBar';
import IndexComponent from './components/index/Index'
import { useAuth0 } from './react-auth0-spa';
import Loading from './components/common/Loading';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    footer: {
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
  const { loading, user }: any = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Router>
        <header>
          <nav>
            <AppNavBar user={user} />
          </nav>
        </header>
        <main className={classes.main}>
          <Route path="/" component={IndexComponent} />
        </main>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            Made with <span role="img" aria-label="heart">❤️</span> in <b>Zurich</b>
          </Container>
        </footer>
      </Router>
    </div>
  );
}

export default App;
