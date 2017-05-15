import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// check for props that's being passed if it has userToken in it
// if set, render the component
// if not, use Redirect to redirect to login page -- also passing the current path to the login page via querystring.
export default ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={props => (
      cProps.userToken !== null
      ? <C {...props} {...cProps} />
      : <Redirect to={`/login?redirect=${props.location.pathname}${props.loccation.search}`} />
  )}/>
);