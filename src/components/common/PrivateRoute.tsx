import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "../../react-auth0-spa";

interface PrivateRouteProps {
  component: Function,
  path: string | string[],
}

const PrivateRoute = ({ component: Component, path, ...rest }: PrivateRouteProps) => {
  const { isAuthenticated }: any = useAuth0();


  useEffect(() => {
    const fn = async () => {
      if (!isAuthenticated) {
        return <Redirect to='/login' />;
      } else{
        return <Route path={path} render={render} {...rest} />;
      }
    };
    fn();
  }, [isAuthenticated, path]);

  const render = (props: any) => <Component {...props} />;

  //return <Route path={path} render={render} {...rest} />;

  return (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Route path={path} render={render} {...rest} />
        : <Redirect to='/login' />
    )} />
  )
};

export default PrivateRoute;
