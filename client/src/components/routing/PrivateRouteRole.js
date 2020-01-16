import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => {
  const { roles } = rest;
  // if (!loading) {
  //   console.log('loading', loading);
  //   console.log('isAuthenticated', isAuthenticated);
  //   console.log('roles', roles);
  // } else {
  //   console.log('loading', loading);
  //   console.log('isAuthenticated', isAuthenticated);
  //   console.log('roles', roles);
  // }

  const canAccess = !loading && isAuthenticated && roles.includes(user.role);
  // console.log('canAccess', canAccess);

  return (
    <Route
      {...rest}
      render={props =>
        canAccess ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStaeToProps = state => ({
  auth: state.auth
});

export default connect(mapStaeToProps)(PrivateRoute);
