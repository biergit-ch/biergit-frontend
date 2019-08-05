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
  Drawer,
  Hidden,
} from '@material-ui/core';

// import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import AppSideBar from './AppSideBar';
import theme from '../../theme';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

interface AppNavBarProps extends RouteComponentProps {
  container?: Element;
}

const AppNavBar: React.FC<AppNavBarProps> = (props: AppNavBarProps) => {
  const { container } = props;
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  // const navigateHome = () => {
  //   props.history.push('/');
  // }

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  return (
    <div>
      <AppBar position="static" color="primary">
      <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Biergit
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <AppSideBar/>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <AppSideBar/>
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default withRouter(AppNavBar);
