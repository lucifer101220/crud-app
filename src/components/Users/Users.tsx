import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { getAllUsers, deleteUser } from '../../reducer/usersReducer';
import { User } from '../../type/users';
import { IndexedObject } from '../../utils/type';
import { Card, Avatar, Image, Skeleton, Input, Select, Button, notification } from 'antd';
import {
  InfoCircleOutlined,
  FormOutlined,
  DeleteOutlined,
  UserAddOutlined,
  SmileOutlined,
  FrownOutlined,
} from '@ant-design/icons';
import './Users.scss';
import { Params } from '../../application/config/axios-interceptor';

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

const Users: React.FC<IndexedObject> = (props) => {
  const { usersList, totalUsers, loading } = props;

  useEffect(() => {
    props.getAllUsers();
  }, []);

  const onSearch = (value: string) => {
    if (value) {
      const params: Params = {
        search: value,
      };
      props.getAllUsers(params);
    } else props.getAllUsers();
  };

  const onSort = (value: string) => {
    if (value) {
      switch (value) {
        case 'nameasc': {
          const params = { sortBy: 'name', order: 'asc' };
          props.getAllUsers(params);
          break;
        }
        case 'namedesc': {
          const params = { sortBy: 'name', order: 'desc' };
          props.getAllUsers(params);
          break;
        }
        case 'latest': {
          const params = { sortBy: 'created_at', order: 'desc' };
          props.getAllUsers(params);
          break;
        }
        case 'oldest': {
          const params = { sortBy: 'created_at', order: 'asc' };
          props.getAllUsers(params);
          break;
        }
      }
    } else props.getAllUsers();
  };
  console.log(usersList);

  return (
    <div className="page users_page">
      <div className="page_header">
        <div className="total_items">
          <p>
            Total users : <span>{totalUsers}</span>
          </p>
        </div>
        <div className="page_actions">
          <div className="sort">
            <Select
              placeholder="Sort users"
              allowClear
              disabled={usersList.length === 0}
              loading={loading}
              onChange={onSort}
            >
              <Option value="nameasc">Name Asc</Option>
              <Option value="namedesc">Name Desc</Option>
              <Option value="latest">Latest</Option>
              <Option value="oldest">Oldest</Option>
            </Select>
          </div>
          <div className="search">
            <Search
              placeholder="Please enter text..."
              onSearch={onSearch}
              enterButton
              loading={loading}
              disabled={usersList.length === 0}
            />
          </div>
          <div className="add">
            <Button type="primary" icon={<UserAddOutlined />} loading={loading}>
              Add user
            </Button>
          </div>
        </div>
      </div>
      <div className="users_list">
        {loading ? (
          <>
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
            <Skeleton active className="user_item_wrap" />
          </>
        ) : (
          usersList.map((user: User) => (
            <div className="user_item_wrap" key={user.id}>
              <Card
                className="user_item"
                cover={
                  <Image
                    alt={user.name}
                    src={`https://picsum.photos/id/${user.image_id}/600/300`}
                    fallback="https://picsum.photos/id/1062/800/400"
                  />
                }
                actions={[
                  <InfoCircleOutlined key="setting" />,
                  <FormOutlined key="edit" />,
                  <DeleteOutlined key="ellipsis" onClick={() => props.deleteUser(user.id)} />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar
                      src={`https://picsum.photos/id/${user.avatar_id}/60/60`}
                      onError={() => true}
                    />
                  }
                  title={user.name}
                  description={
                    <div className="user_detail">
                      <p>{user.phone}</p>
                      <p>{user.email}</p>
                    </div>
                  }
                />
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }: AppState) => ({
  usersList: users.usersList,
  totalUsers: users.totalUsers,
  loading: users.loading,
});

const mapDispatchToProps = { getAllUsers, deleteUser };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
