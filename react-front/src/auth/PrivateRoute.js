import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticated} from './index';

const PrivateRoute = ({component: Component, ...rest}) => {
  //props has components passed down to this private route
  return <Route {...rest} render={props => isAuthenticated() ? (
    <Component {...props} />
    ) : (
      <Redirect 
        to={{
          pathname: '/signin', 
        state: { from: props.location }
      }}
      />
    )} 
  />
}

export default PrivateRoute;