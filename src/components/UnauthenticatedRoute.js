import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// check userToken is not set before we renderthe component that's being passed, if logged in i.e has userToken - we redirect to homepage.
export default ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={props => (
    cProps.userToken === null
      ? <C {...props} {...cProps} />
      : <Redirect to="/" />
  )}/>
); 