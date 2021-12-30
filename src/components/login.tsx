import { Button, Checkbox, Form, Input } from 'antd';
import * as React from 'react';
import { IndexedObject } from '../utils/type';
import { UserOutlined, LockOutlined, ArrowRightOutlined } from '@ant-design/icons';
import './auth.scss';
import { Link } from 'react-router-dom';

const LoginPage: React.FC<IndexedObject> = () => {
  return (
    <div className="page auth_page login_page">
      <div className="auth_card">
        <h3>- Log In -</h3>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item className="remember">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="/register" className="login-form-forgot">
              Register <ArrowRightOutlined />
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
