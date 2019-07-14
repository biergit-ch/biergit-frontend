import React, { useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import InfoIcon from '@material-ui/icons/Info';

import { useAuth0 } from '../../react-auth0-spa';

const useStyles = makeStyles({
    bottomNav: {
    },
});

const BottomNav: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState('/');
    const { user, isAuthenticated }: any = useAuth0();

    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setAuthenticated(isAuthenticated)
    }, [isAuthenticated, user])

    function handleChange(event: React.ChangeEvent<{}>, newValue: string) {
        setValue(newValue);
        props.history.push(`${newValue}`);
    }

    return (
        <BottomNavigation value={value} onChange={handleChange} className={classes.bottomNav}>
            <BottomNavigationAction label="Home" value="/home" icon={<HomeIcon />} />
            {authenticated && (<BottomNavigationAction label="Group" value="/groups" icon={<GroupIcon />} />)}
            {authenticated && (<BottomNavigationAction label="Profile" value="/profile" icon={<PersonIcon />} />)}
            <BottomNavigationAction label="Info" value="/about" icon={<InfoIcon />} />
        </BottomNavigation>
    );
}

export default withRouter(BottomNav);