import { Button, Checkbox, Form, Input } from 'antd';
import React, { useEffect } from 'react';
import { IndexedObject } from '../utils/type';
import { MailOutlined, LockOutlined, ArrowRightOutlined, RocketOutlined } from '@ant-design/icons';
import './auth.scss';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { publicUrl } from '../utils/common';
import { IRegisterProps } from './register';
import { connect } from 'react-redux';
import { AppState } from '../reducer';
import { loginFirebaseSuccess } from '../reducer/authenReducer';
import { getAllAccounts } from '../reducer/accountsReducer';
import { notificationApp } from './notification';
import { Helmet } from 'react-helmet';

type LoginForm = {
  email: string;
  password: string;
};

interface ILoginProps extends StateProps, DispatchProps, RouteComponentProps<IndexedObject> {}

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  // callbacks: {
  //   // Avoid redirects after sign-in.
  //   signInSuccessWithAuthResult: () => true,
  // },
  signInSuccessUrl: '/welcome',
};

const LoginPage: React.FC<ILoginProps> = (props) => {
  const [formLogin] = Form.useForm();
  const history = useHistory();
  const validateMessages = {
    required: '${label} is required!',
    types: {
      string: '${label} is not a valid string!',
      email: '${label} is not a valid email!',
    },
  };

  useEffect(() => {
    props.getAllAccounts();
  }, []);

  const onLogin = (values: LoginForm) => {
    if (props.totalAccounts > 0) {
      const acc = props.accountsList.find((account) => account.email === values.email);
      if (acc) {
        if (acc.password === values.password) {
          props.loginFirebaseSuccess(acc);
          notificationApp('Login successfully !');
          history.push('/welcome');
        } else notificationApp('Incorrect password !', 'frown');
      } else notificationApp('Account does not exist !', 'frown');
    } else {
      notificationApp('Account does not exist !', 'frown');
    }
  };

  return (
    <div className="page auth_page login_page">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="auth_card">
        <div className="auth_card_left">
          <img src={publicUrl('/images/login.jpg')} alt="auth" />
        </div>
        <div className="auth_card_right">
          <h3>- Sign In -</h3>
          <Form
            name="login_form"
            className="login-form"
            form={formLogin}
            onFinish={onLogin}
            validateMessages={validateMessages}
          >
            <Form.Item name="email" rules={[{ required: true }, { type: 'email' }]}>
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true }, { type: 'string' }]}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item className="remember">
              <Form.Item noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Link to="/register" className="login-form-forgot">
                Sign up <ArrowRightOutlined />
              </Link>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                <RocketOutlined /> Sign in
              </Button>
            </Form.Item>
          </Form>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication, accounts }: AppState) => ({
  isAuthenticated: authentication.isAuthenticated,
  account: authentication.account,
  accountsList: accounts.accountsList,
  totalAccounts: accounts.totalAccounts,
});

const mapDispatchToProps = { getAllAccounts, loginFirebaseSuccess };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
