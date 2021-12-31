import { Button, Form, Image, Input, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { IndexedObject } from '../../utils/type';
import { RocketOutlined } from '@ant-design/icons';
import NoImage from '../../images/no-img.jpg';
import NoAvatar from '../../images/no-avatar.jpg';
import { randomInt } from '../../utils/common';

const CityForm: React.FC<IndexedObject> = ({ onFinish, isEditForm, form }) => {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      string: '${label} is not a valid email!',
      email: '${label} is not a valid email!',
    },
  };

  return (
    <Form name="city_form" form={form} onFinish={onFinish} validateMessages={validateMessages}>
      {isEditForm && (
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
      )}
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }, { type: 'email' }]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<RocketOutlined />}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(CityForm);
