import { IndexedObject } from './type';
import {
  InfoCircleOutlined,
  FormOutlined,
  DeleteOutlined,
  UserAddOutlined,
  SmileOutlined,
  FrownOutlined,
} from '@ant-design/icons';
import { notification } from 'antd';

export const isEmptyObject = (obj: IndexedObject): boolean => {
  for (const prop in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
};

export const publicUrl = (url: string): string => {
  return `${process.env.PUBLIC_URL}${url}`;
};

// export const notificationUsers = (message: string, type?: string): any => {
//   notification.open({
//     message: message,
//     icon:
//       type === 'frown' ? (
//         <SmileOutlined style={{ color: '#108ee9' }} />
//       ) : (
//         <FrownOutlined style={{ color: '#db0e29' }} />
//       ),
//   });
// };
