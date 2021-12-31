import { Link, NavLink, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { IndexedObject } from '../utils/type';
import PrivateRoute from './private-route';
import PublicRoute from './publicRoute';
import NoMatch from '../components/no_match';
import RegisterPage from '../components/register';
import LoginPage from '../components/login';
import { Layout, Menu, Breadcrumb } from 'antd';
import { publicUrl } from '../utils/common';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { loginFirebaseSuccess, logout } from '../reducer/authenReducer';
import { notificationApp } from '../components/notification';
import { getAuth, signOut } from 'firebase/auth';

// Configure Firebase.
const config = {
  apiKey: process.env.REACT_APP_API_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_AUTH_FIREBASE_DOMAIN,
};
firebase.initializeApp(config);

const { Header, Content, Footer } = Layout;

const WelcomePage = React.lazy(() => import('../components/welcome'));
const Users = React.lazy(() => import('../components/Users/Users'));
const Citys = React.lazy(() => import('../components/Citys/Citys'));
const Companys = React.lazy(() => import('../components/Companys/Companys'));

const Routes: React.FC<IndexedObject> = (props) => {
  // Listen to the Firebase Auth state and set the local state.
  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        return;
      }
      if (props.isAuthenticated) {
        return;
      }
      const token = await user.getIdToken();
      const dataUser = {
        name: user.displayName,
        email: user.email,
        token: token,
      };
      props.loginFirebaseSuccess(dataUser);
      notificationApp('Login successfully !');
    });
    return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
  }, []);

  type Page = {
    name: string;
    link: string;
    component: any;
  };

  const pages: Page[] = [
    {
      name: 'Welcome',
      link: '/welcome',
      component: WelcomePage,
    },
    {
      name: 'People',
      link: '/users',
      component: Users,
    },
    {
      name: 'Citys',
      link: '/citys',
      component: Citys,
    },
    {
      name: 'Companys',
      link: '/companys',
      component: Companys,
    },
  ];

  const location = useLocation();

  return (
    <Layout
      style={{ background: '#e1e1e1' }}
      className={`${props.isAuthenticated ? '' : 'layout_auth'}`}
    >
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex' }}>
        <div
          className="logo"
          style={{ display: 'inline-block', height: '64px', padding: '8px', marginRight: '50px' }}
        >
          <img
            src={publicUrl('/images/logo.png')}
            alt="logo"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          style={{ minWidth: '600px' }}
        >
          {pages.map((component: Page) => (
            <Menu.Item key={component.link}>
              <NavLink to={component.link}>{component.name}</NavLink>
            </Menu.Item>
          ))}
        </Menu>
        {props.isAuthenticated && (
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[location.pathname]}
            style={{ justifyContent: 'flex-end', marginLeft: 'auto', minWidth: '400px' }}
          >
            <Menu.Item style={{ background: 'none' }} key="acc">
              <p>
                Hello :
                <span
                  style={{
                    fontSize: '15px',
                    fontWeight: 600,
                    display: 'inline-block',
                    marginLeft: '6px',
                  }}
                >
                  {props.account.name}
                </span>
              </p>
            </Menu.Item>
            <Menu.Item
              onClick={() => {
                props.logout();
                const auth = getAuth();
                signOut(auth)
                  .then(() => {
                    console.log('Logout firebase successfully');
                  })
                  .catch((error) => {
                    console.log('Logout firebase failed', error);
                  });
              }}
              key="logout"
            >
              <p>Log Out</p>
            </Menu.Item>
          </Menu>
        )}
      </Header>
      <Content className="site-layout" style={{ padding: '0 50px 54px', marginTop: 64 }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>CRUD App</Breadcrumb.Item>
          <Breadcrumb.Item>
            {pages.find((page: Page) => page.link === location.pathname)?.name}
          </Breadcrumb.Item>
        </Breadcrumb>
        <div
          className="site-layout-background"
          style={{
            padding: 20,
            minHeight: 'calc(100vh - 64px - 54px - 54px - 62px)',
            background: '#f7f7f7',
            borderRadius: '5px',
          }}
        >
          <Switch>
            <Route exact path="/">
              <Redirect to="/users" />
            </Route>
            {pages.map((component: Page) => (
              <PrivateRoute
                key={component.link}
                exact
                path={component.link}
                component={component.component}
                fallback={<div>Loading...</div>}
              />
            ))}
            {!props.isAuthenticated && (
              <>
                <PublicRoute exact path="/login" component={LoginPage} />
                <PublicRoute exact path="/register" component={RegisterPage} />
              </>
            )}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>CRUD App ©2021 Created by Chien</Footer>
    </Layout>
  );
};

const mapStateToProps = ({ authentication }: AppState) => ({
  isAuthenticated: authentication.isAuthenticated,
  account: authentication.account,
});

const mapDispatchToProps = { loginFirebaseSuccess, logout };

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
