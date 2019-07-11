import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";

interface PrivateRouteProps {
    component: Function,
    path: string | string[],
}

const PrivateRoute = ({ component: Component, path, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated, loginWithRedirect }: any = useAuth0();

  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect({
          appState: { targetUrl: path }
        });
      }
    };
    fn();
  }, [isAuthenticated, loginWithRedirect, path]);

  const render = (props: any) => <Component {...props} />;

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
