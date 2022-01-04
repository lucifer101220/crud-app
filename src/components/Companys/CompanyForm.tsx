import { Button, Form, Image, Input, InputNumber } from 'antd';
import React from 'react';
import { IndexedObject } from '../../utils/type';
import { RocketOutlined } from '@ant-design/icons';

const CompanyForm: React.FC<IndexedObject> = ({ onFinish, isEditForm, form }) => {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      string: '${label} is not a valid email!',
      email: '${label} is not a valid email!',
    },
  };

  return (
    <Form name="company_form" form={form} onFinish={onFinish} validateMessages={validateMessages}>
      {isEditForm && (
        <Form.Item name="id" hidden>
          <Input />
        </Form.Item>
      )}
      <Form.Item name="name" label="Name" rules={[{ required: true }, { type: 'string' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="bs" label="BS" rules={[{ required: true }, { type: 'string' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="suffix" label="Suffix" rules={[{ required: true }, { type: 'string' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="adjective"
        label="Adjective"
        rules={[{ required: true }, { type: 'string' }]}
      >
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

export default React.memo(CompanyForm);
