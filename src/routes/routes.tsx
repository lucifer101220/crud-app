import { Link, NavLink, Route, Switch, useLocation } from 'react-router-dom';
import * as React from 'react';
import { IndexedObject } from '../utils/type';
import PrivateRoute from './private-route';
import PublicRoute from './publicRoute';
import NoMatch from '../components/no_match';
import Home from '../components/home';
import RegisterPage from '../components/register';
import LoginPage from '../components/login';
import { Layout, Menu, Breadcrumb } from 'antd';
import { publicUrl } from '../utils/common';

const { Header, Content, Footer } = Layout;

const WelcomePage = React.lazy(() => import('../components/welcome'));
const Users = React.lazy(() => import('../components/Users/Users'));
const Citys = React.lazy(() => import('../components/Citys/Citys'));
const Companys = React.lazy(() => import('../components/Companys/Companys'));

const Routes: React.FC<IndexedObject> = () => {
  type Page = {
    name: string;
    link: string;
    component: any;
  };

  const pages: Page[] = [
    {
      name: 'Welcome',
      link: '/',
      component: WelcomePage,
    },
    {
      name: 'Users',
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
    <Layout style={{ background: '#e1e1e1' }}>
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
            {pages.map((component: Page) => (
              <PublicRoute
                key={component.link}
                exact
                path={component.link}
                component={component.component}
                fallback={<div>Loading...</div>}
              />
            ))}
            {/* <Route exact path="/" component={WelcomePage} />
            <PublicRoute exact path="/login" component={LoginPage} />
            <PublicRoute exact path="/register" component={RegisterPage} />
            <PrivateRoute exact path="/home" component={Home} /> */}
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>CRUD App ©2021 Created by Chien</Footer>
    </Layout>
  );
};

export default Routes;
