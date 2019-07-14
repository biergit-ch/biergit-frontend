import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";
import Loading from "./Loading";

interface PrivateRouteProps {
  component: Function,
  path: string | string[],
}

const PrivateRoute = ({ component: Component, path, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated, loading }: any = useAuth0();

  const render = (props: any) => <Component {...props} />;

  return (
    <Route {...rest} render={(props) => (
      loading === true
        ? <Loading /> :
        isAuthenticated === true ?
          <Route path={path} render={render} {...rest} />
          : <Redirect to='/login' />
    )} />
  );
}

export default PrivateRoute;
