import React from "react";

import NoMatch from "../common/components/NoMatch";
import { Switch, Route, Redirect } from "react-router-dom";
import Profile from "../components/profile/Profile";
import Debugger from "../components/debugger/Debugger";
import { GroupCreationContextProvider } from "../providers/GroupCreationContextProvider";
import { ExpenseSummary } from "../components/expenses/ExpenseSummary";
import { GroupMembers } from "../components/group/creation/GroupMembers";
import { GroupDetailsEdit } from "../components/group/detail/GroupDetailsEdit";
import { GroupDetail } from "../components/group/detail/GroupDetail";
import { Friends } from "../components/friends/Friends";
import { useAuth0 } from "../auth/auth0-spa";
import { LandingPage } from "../components/landing/LandingPage";
import { Loading } from "../common/components/Loading";

const Routes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth0();
  return (
    <>
      {loading ? (
        <Loading />
      ) : isAuthenticated ? (
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route path="/home" component={ExpenseSummary} />
          <Route path="/users/me" title="Profile" component={Profile} />
          <Route path="/groups/:groupId" component={GroupDetail} />
          <Route path="/friends" component={Friends} />
          <GroupCreationContextProvider>
            <Route path="/group/create/new" component={GroupMembers} />
            <Route
              path={["/group/details", "/group/details/:groupId"]}
              component={GroupDetailsEdit}
            />
          </GroupCreationContextProvider>
          {process.env.NODE_ENV === "development" && (
            <Route path="/debugger" component={Debugger} />
          )}
          <Route component={NoMatch} />
        </Switch>
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default Routes;
