import React, { FC, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { authSelector } from '../application/selector/authSelector';

interface Props extends RouteProps {
  component: any;
  fallback?: any;
}

const PublicRoute: FC<Props> = ({ component: Component, fallback: Fallback, ...rest }) => {
  // const { isAuthenticated } = useSelector(authSelector.authentication);

  return (
    <Route
      {...rest}
      render={(props) =>
        Fallback ? (
          <Suspense fallback={Fallback}>
            <Component {...props} />
          </Suspense>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
