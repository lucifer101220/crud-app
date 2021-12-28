import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { authSelector } from '../application/selector/authSelector';

interface Props extends RouteProps {
  component: any;
}

const PublicRoute: FC<Props> = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(authSelector.authentication);

  return (
    <Route
      {...rest}
      render={(props) => (!isAuthenticated ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default PublicRoute;
