import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';

import Avatar from '@material-ui/core/Avatar';
import BugReportIcon from '@material-ui/icons/BugReport';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Hidden from '@material-ui/core/Hidden';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ShareableListItem from './ShareableListItem';

import history from '../../history';

import {
  makeStyles,
  Theme,
  createStyles,
  fade,
} from '@material-ui/core/styles';

import { useAuth0 } from '../../auth/auth0-spa';
import { ReactComponent as Logo } from '../../common/assets/logo.svg';
import { UserContext } from '../../providers/UserContextProvider';
import Message from '../message/Message';
import { TitlebarContext } from '../../providers/TitlebarContextProvider';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, InputBase, Menu, MenuItem } from '@material-ui/core';
import { useRouteMatch } from 'react-router-dom';
import theme from '../../theme';

const drawerWidth = 240;
const ITEM_HEIGHT = 48;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    avatar: {
      margin: 0,
      width: 30,
      height: 30,
      fontSize: 15,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    logo: {
      height: '40px',
      width: 'auto',
    },
    toolbar: {
      display: 'flex',
      padding: theme.spacing(1, 2),
      ...theme.mixins.toolbar,
    },
    title: {
      flexGrow: 1,
      // display: 'none',
      // [theme.breakpoints.up('sm')]: {
      //   display: 'block',
      // },
    },
    drawerPaper: {
      width: drawerWidth,
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    },
  }),
);

const Navigation: React.FC = () => {
  const { currentUser } = useContext(UserContext);
  const { logout, isAuthenticated } = useAuth0();
  const {
    title,
    hasBack,
    hasHamburgerMenu,
    hasMoreOptions,
    hasSearch,
  } = useContext(TitlebarContext);
  const { t } = useTranslation();
  const [error] = useState<string | undefined>();
  const classes = useStyles(theme);
  const match: any = useRouteMatch('/groups/:groupId');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMoreOptions = Boolean(anchorEl);
  const desktop = useMediaQuery(theme.breakpoints.up('sm'));
  const navShareConfig = {
    params: {
      title: t('navigation_share_title'),
      text: t('navigation_share_text'),
      url: t('navigation_share_url'),
    },
  };

  const handleDrawerToggle = (): void => {
    if (!desktop) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMoreOptionsSelected = (): void => {
    if (match?.params && match?.params?.groupId !== '') {
      history.push(`/group/details/${match?.params?.groupId}`);
    }
    setAnchorEl(null);
  };

  const handleMoreOptionsClose = (): void => {
    setAnchorEl(null);
  };

  const drawer = (
    <div>
      {error && <Message message={error} />}
      <Link
        className={classes.toolbar}
        href="#"
        onClick={(): void => history.push('/')}
      >
        <Logo className={classes.logo} />
      </Link>
      <Divider />
      <List onClick={(): void => handleDrawerToggle()}>
        <ListItem button key="home" onClick={(): void => history.push('/')}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary={t('common_home')} />
        </ListItem>
        <ShareableListItem config={navShareConfig} text={t('common_share')} />
      </List>
      <Divider />
      <List onClick={(): void => handleDrawerToggle()}>
        {isAuthenticated ? (
          <div>
            <ListItem
              button
              key="home"
              onClick={(): void => history.push('/users/me')}
            >
              <ListItemAvatar>
                <Avatar
                  className={classes.avatar}
                  src={(currentUser && currentUser?.pictureUrl) ?? ''}
                />
              </ListItemAvatar>
              <ListItemText primary="Profil" />
            </ListItem>
            {process.env.NODE_ENV === 'development' && (
              <ListItem
                button
                key="debugger"
                onClick={(): void => history.push('/debugger')}
              >
                <ListItemIcon>
                  <BugReportIcon />
                </ListItemIcon>
                <ListItemText primary="Debugger" />
              </ListItem>
            )}
            <ListItem
              button
              key="logout"
              onClick={(): void =>
                logout({
                  returnTo: window.location.origin,
                })
              }
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </div>
        ) : null}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {hasHamburgerMenu && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
          {hasBack && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={(): void => history.goBack()}
              className={classes.menuButton}
            >
              <ArrowBackIcon />
            </IconButton>
          )}

          <Typography variant="h5" noWrap className={classes.title}>
            {title}
          </Typography>

          {hasSearch && (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          )}

          {hasMoreOptions && (
            <>
              <IconButton
                aria-label="display more actions"
                edge="end"
                color="inherit"
                onClick={handleClick}
              >
                <MoreIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={openMoreOptions}
                onClose={handleMoreOptionsClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200,
                  },
                }}
              >
                <MenuItem onClick={handleMoreOptionsSelected}>
                  {t('sidebar_settings')}
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        {/* Mobile Drawer */}
        <Hidden smUp implementation="css">
          <Drawer
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
            {drawer}
          </Drawer>
        </Hidden>
        {/* Desktop Drawer */}
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default Navigation;
