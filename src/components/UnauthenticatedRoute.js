import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// reads the URL, returns the query param
function queryString(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if ( ! results ) { return null; }
  if ( ! results[2] ) {return ''; }

  return decodeURIComponent(results[2].replace(/\+/g, ""));
}

// check userToken is not set before we render the component that's being passed, if logged in i.e has userToken - we redirect to homepage.
// Update - use the query string to redirect to that route upon logging in
export default ({ component: C, props: cProps, ...rest }) => {
  const redirect = queryString('redirect');
  return (
    <Route {...rest} render={props => (
      cProps.userToken === null
        ? <C {...props} {...cProps} />
        : <Redirect to={(redirect === '' || redirect === null)
            ? '/'
            : redirect} />
    )}/>
  );
}; 