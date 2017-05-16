import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
import Signup from './containers/Signup';
import NewNote from './containers/NewNote';
import Notes from './containers/Notes';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

import AppliedRoute from './components/AppliedRoute';

export default ({ childProps }) => (
    <Switch>
        {/* use exact to just apply to exact url 
            childProps coming from what is being passed from parent
            component
        */}
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        {/* swith to be using Authenticated and Unauthenticated routes */}
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
        <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
        {/* Next route for individual note would be using AuthenticatedRoute */}
        <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} />
        {/* put /notes/new above the /notes/:id so it can catch /notes/new */}
        <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} />

        {/* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
    </Switch>
)