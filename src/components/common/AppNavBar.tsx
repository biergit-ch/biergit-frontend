import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { createStyles, WithStyles, withStyles } from '@material-ui/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';

const styles = createStyles({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

export interface AppNavBarProps extends WithStyles<typeof styles> {
  user: any;
}
class AppNavBar extends React.Component<AppNavBarProps> {

  // tslint:disable-next-line: max-line-length
  signInLink = React.forwardRef((_props, _ref) => <Link to="/profile-class">signin</Link>);
  signOutLink = React.forwardRef((_props, _ref) => <Link to="/auth/logout">signout</Link>);
  profileLink = React.forwardRef((_props, _ref) => <Link to="/profile-class">profile</Link>);
  groupLink = React.forwardRef((_props, _ref) => <Link to="/group?title=Group12">group</Link>);
  aboutLink = React.forwardRef((_props, _ref) => <Link to="/about">about</Link>);

  render() {
    const { classes } = this.props;
    const authenticated = false;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Home"
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
            {authenticated && (<Button color="inherit" component={this.aboutLink} />)}
            {authenticated && (<Button color="inherit" component={this.groupLink} />)}
            {authenticated && (<Button color="inherit" component={this.profileLink} />)}
            {!authenticated && (<Button color="inherit" component={this.signInLink} />)}
            {authenticated && (<Button color="inherit" component={this.signOutLink} />)}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles as any, { withTheme: true })(AppNavBar as any);
