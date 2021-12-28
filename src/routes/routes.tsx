import { Route, Switch } from 'react-router-dom';
import * as React from 'react';
import { IndexedObject } from '../utils/type';
import PrivateRoute from './private-route';
import PublicRoute from './publicRoute';
import NoMatch from '../components/no_match';
import Home from '../components/home';
import RegisterPage from '../components/register';
import LoginPage from '../components/login';
import WelcomePage from '../components/welcome';

const Routes: React.FC<IndexedObject> = () => (
  <Switch>
    <Route exact path="/" component={WelcomePage} />
    <PublicRoute exact path="/login" component={LoginPage} />
    <PublicRoute exact path="/register" component={RegisterPage} />
    <PrivateRoute exact path="/home" component={Home} />
    <Route component={NoMatch} />
  </Switch>
);

export default Routes;
