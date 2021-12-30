import { Button, Form, Image, Input, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import { IndexedObject } from '../../utils/type';
import { RocketOutlined } from '@ant-design/icons';
import NoImage from '../../images/no-img.jpg';
import NoAvatar from '../../images/no-avatar.jpg';
import { randomInt } from '../../utils/common';

const UserForm: React.FC<IndexedObject> = ({ onFinish, isEditForm, form }) => {
  const validateMessages = {
    required: '${label} is required!',
    types: {
      string: '${label} is not a valid email!',
      email: '${label} is not a valid email!',
    },
  };

  const [imageId, setImageId] = useState<number>(-1);
  const [avatarId, setAvatarId] = useState<number>(-1);

  useEffect(() => {
    if (isEditForm) {
      setImageId(form.getFieldValue('image_id'));
      setAvatarId(form.getFieldValue('avatar_id'));
    }
  }, [isEditForm]);

  const handleImage = () => {
    const randomId = randomInt(1000);
    setImageId(randomId);
    form.setFieldsValue({
      image_id: randomId,
    });
  };

  const handleAvatar = () => {
    const randomId = randomInt(1000);
    setAvatarId(randomId);
    form.setFieldsValue({
      avatar_id: randomId,
    });
  };

  return (
    <Form name="user_form" form={form} onFinish={onFinish} validateMessages={validateMessages}>
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
      <Form.Item className="image" label="Click to random image">
        <Image
          alt="image"
          preview={false}
          src={`https://picsum.photos/id/${imageId}/400/200`}
          fallback={NoImage}
          placeholder={
            <Image preview={false} src={`https://picsum.photos/id/${imageId}/400/200/?blur=2`} />
          }
          onClick={handleImage}
        />
      </Form.Item>
      <Form.Item className="avatar" label="Click to random avatar">
        <Image
          alt="avatar"
          preview={false}
          src={`https://picsum.photos/id/${avatarId}/200/200`}
          fallback={NoAvatar}
          placeholder={
            <Image preview={false} src={`https://picsum.photos/id/${avatarId}/200/200/?blur=2`} />
          }
          onClick={handleAvatar}
        />
      </Form.Item>
      <Form.Item name="image_id" hidden>
        <InputNumber value={imageId} />
      </Form.Item>
      <Form.Item name="avatar_id" hidden>
        <InputNumber value={avatarId} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<RocketOutlined />}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default React.memo(UserForm);
