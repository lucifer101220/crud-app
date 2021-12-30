import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import { notification } from 'antd';

export const notificationUsers = (message: string, type?: string): void => {
  notification.open({
    message: message,
    icon:
      type === 'frown' ? (
        <FrownOutlined style={{ color: '#db0e29' }} />
      ) : (
        <SmileOutlined style={{ color: '#108ee9' }} />
      ),
  });
};
