import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  Theme,
  makeStyles,
  createStyles,
} from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    }
  })
);

const AppNavBar: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {

  const classes = useStyles();

  const navigateHome = () => {
    props.history.push('/');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Home"
            onClick={navigateHome}
          >
            <HomeIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.grow}
            style={{ textAlign: 'left' }}
          >
            Biergit
            </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(AppNavBar);
