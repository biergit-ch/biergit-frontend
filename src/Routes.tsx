import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Index from './components/index/Index';
import Login from './components/login/Login';
import PrivateRoute from './components/common/PrivateRoute';
import Groups from './components/group/Groups';
import Profile from './components/profile/Profile';
import About from './components/about/About';
import NoMatch from './components/common/NoMatch';
import { useAuth0 } from './react-auth0-spa';
import Loading from './components/common/Loading';
import CreateGroup from './components/group/CreateGroup';
import { PrivacyPolicy } from './components/about/PrivacyPolicy';

const Routes: React.FC = () => {
    const { loading }: any = useAuth0();

    if (loading) {
        return <Loading />
    } else {
        return (
            <Switch>
                <Redirect exact from='/' to='/home' />
                <PrivateRoute path="/home" component={Index} />
                <Route path="/login" component={Login} />
                <Route path="/callback" component={Login} />
                <PrivateRoute path="/groups/create" component={CreateGroup} />
                <PrivateRoute path="/groups" component={Groups}/>
                <PrivateRoute path="/profile" component={Profile} />
                <Route path="/about" exact component={About} />
                <Route path="/about/privacypolicy" component={PrivacyPolicy} />
                <Route component={NoMatch} />
            </Switch>
        )
    }
}

export default Routes;