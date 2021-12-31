import React from 'react';
import { Button, Checkbox, Form, Input, InputNumber } from 'antd';
import {
  MailOutlined,
  LockOutlined,
  ArrowRightOutlined,
  FireOutlined,
  PhoneOutlined,
  GitlabOutlined,
} from '@ant-design/icons';
import { IndexedObject } from '../utils/type';
import { Link, RouteComponentProps, useHistory } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import './auth.scss';
import { createEntity, reset } from '../reducer/registerReducer';
import { AppState } from '../reducer';
import { omit } from '../utils/object';
import { IRegisterModel } from '../models/register_model';
import { useState } from 'react';
import { publicUrl } from '../utils/common';
import { getAllAccounts, createAccount } from '../reducer/accountsReducer';
import { notificationApp } from './notification';
import { Helmet } from 'react-helmet';

export interface IRegisterProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<IndexedObject> {}

type RegisterForm = {
  email: string;
  password: string;
  name: string;
  phone: string;
};
const RegisterPage: React.FC<IRegisterProps> = (props) => {
  const [formRegister] = Form.useForm();
  const history = useHistory();
  const validateMessages = {
    required: '${label} is required!',
    types: {
      string: '${label} is not a valid string!',
      email: '${label} is not a valid email!',
    },
  };

  const onRegister = (values: RegisterForm) => {
    if (props.accountsList.find((acc) => acc.email === values.email)) {
      notificationApp('Email already exists !', 'frown');
    } else {
      const data = {
        ...values,
        token: `token${values.email}`,
        created_at: Date.now(),
      };
      props.createAccount(data);
      setTimeout(() => {
        history.push('/login');
      }, 900);
    }
  };

  return (
    <div className="page auth_page register_page">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="auth_card">
        <div className="auth_card_left">
          <img src={publicUrl('/images/register.jpg')} alt="auth" />
        </div>
        <div className="auth_card_right">
          <h3>- Sign Up -</h3>
          <Form
            name="register_form"
            className="register-form"
            form={formRegister}
            onFinish={onRegister}
            validateMessages={validateMessages}
          >
            <Form.Item name="name" rules={[{ required: true }, { type: 'string' }]}>
              <Input
                prefix={<GitlabOutlined className="site-form-item-icon" />}
                placeholder="Name"
              />
            </Form.Item>
            <Form.Item name="phone" rules={[{ required: true }, { type: 'string' }]}>
              <Input
                prefix={<PhoneOutlined className="site-form-item-icon" />}
                placeholder="Phone"
              />
            </Form.Item>
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
              <Form.Item noStyle>Do you already have an account ?</Form.Item>
              <Link to="/login" className="register-form-forgot">
                Sign in <ArrowRightOutlined />
              </Link>
            </Form.Item>
            <Form.Item>
              <Button
                loading={props.loading}
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                <FireOutlined /> Sign up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ accounts }: AppState) => ({
  accountsList: accounts.accountsList,
  loading: accounts.loading,
});

const mapDispatchToProps = { createAccount };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
