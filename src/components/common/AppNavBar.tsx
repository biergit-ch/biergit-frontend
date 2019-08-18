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

import MenuIcon from '@material-ui/icons/Menu';
import AppSideBar from './AppSideBar';
import theme from '../../theme';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('xl')]: {
        display: 'none',
      },
    },
    drawer: {
      [theme.breakpoints.up('xl')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
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
  const [open, setOpen] = React.useState(false);

  function handleDrawerToggle() {
    setOpen(!open);
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
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={open}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <AppSideBar />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default withRouter(AppNavBar);
