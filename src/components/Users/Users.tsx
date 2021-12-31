import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../reducer';
import { getAllUsers, deleteUser, createUser, editUser } from '../../reducer/usersReducer';
import { User } from '../../type/type';
import { IndexedObject } from '../../utils/type';
import { Helmet } from 'react-helmet';
import {
  Card,
  Avatar,
  Image,
  Skeleton,
  Input,
  Select,
  Button,
  Form,
  Modal,
  Pagination,
  Popconfirm,
} from 'antd';
import {
  InfoCircleOutlined,
  FormOutlined,
  DeleteOutlined,
  UserAddOutlined,
  SyncOutlined,
  SearchOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import './Users.scss';
import { Params } from '../../application/config/axios-interceptor';
import UserForm from './UserForm';
import NoImage from '../../images/no-img.jpg';
import moment from 'moment';
import { PAGE_SIZE_USERS } from '../../api/usersApi';

const { Meta } = Card;
const { Option } = Select;
const onParams = (sortBy: string, order: string, search?: string) => {
  if (search) {
    return {
      sortBy,
      order,
      search,
    };
  } else
    return {
      sortBy,
      order,
    };
};

const Users: React.FC<IndexedObject> = (props) => {
  type FormActions = {
    search: string;
    sort: string | undefined;
  };

  const { usersList, totalUsers, loading } = props;
  const [formActions] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    props.getAllUsers();
  }, []);

  const onSearchAndSort = (search: string, sort: string) => {
    switch (sort) {
      case 'nameasc': {
        props.getAllUsers(onParams('name', 'asc', search));
        break;
      }
      case 'namedesc': {
        props.getAllUsers(onParams('name', 'desc', search));
        break;
      }
      case 'created_latest': {
        props.getAllUsers(onParams('created_at', 'desc', search));
        break;
      }
      case 'created_oldest': {
        props.getAllUsers(onParams('created_at', 'asc', search));
        break;
      }
    }
  };

  const onSearch = (values: FormActions) => {
    if (!values.search && !values.sort) {
      props.getAllUsers();
    } else {
      if (values.search && !values.sort) {
        const params: Params = {
          search: values.search,
        };
        props.getAllUsers(params);
      }
      if (values.search && values.sort) {
        onSearchAndSort(values.search, values.sort);
      }
    }
  };

  const onSort = (value: string) => {
    const valueSearch = formActions.getFieldValue('search');
    if (value) {
      if (valueSearch) {
        onSearchAndSort(valueSearch, value);
      } else {
        switch (value) {
          case 'nameasc': {
            props.getAllUsers(onParams('name', 'asc'));
            break;
          }
          case 'namedesc': {
            props.getAllUsers(onParams('name', 'desc'));
            break;
          }
          case 'created_latest': {
            props.getAllUsers(onParams('created_at', 'desc'));
            break;
          }
          case 'created_oldest': {
            props.getAllUsers(onParams('created_at', 'asc'));
            break;
          }
        }
      }
    } else {
      if (valueSearch) {
        props.getAllUsers({ search: valueSearch });
      } else props.getAllUsers();
    }
  };

  const onFinishAdd = useCallback((values: User) => {
    const data = {
      ...values,
      created_at: Date.now(),
    };
    props.createUser(data);
    setShowModalAdd(false);
    formAdd.resetFields();
  }, []);

  const handleEdit = (user: User) => {
    formEdit.setFieldsValue(user);
    setShowModalEdit(true);
  };

  const onFinishEdit = useCallback((values: User) => {
    const data = {
      ...values,
      created_at: Date.now(),
    };
    props.editUser(data);
    setShowModalEdit(false);
    formEdit.resetFields();
  }, []);

  const onChangePage = (page: number, pageSize: number) => {
    setPage(page);
    const sortValue = formActions.getFieldValue('sort');
    const searchValue = formActions.getFieldValue('search');
    const paramsPage = { page: page };
    if (sortValue) {
      switch (sortValue) {
        case 'nameasc': {
          props.getAllUsers({ ...onParams('name', 'asc', searchValue), ...paramsPage });
          break;
        }
        case 'namedesc': {
          props.getAllUsers({ ...onParams('name', 'desc', searchValue), ...paramsPage });
          break;
        }
        case 'created_latest': {
          props.getAllUsers({ ...onParams('created_at', 'desc', searchValue), ...paramsPage });
          break;
        }
        case 'created_oldest': {
          props.getAllUsers({ ...onParams('created_at', 'asc', searchValue), ...paramsPage });
          break;
        }
      }
    } else {
      props.getAllUsers({ search: searchValue, ...paramsPage });
    }
  };

  return (
    <div className="page users_page">
      <Helmet>
        <title>People</title>
      </Helmet>
      <div className="page_header">
        <div className="total_items">
          <p>
            Total people : <span>{totalUsers}</span>
          </p>
        </div>
        <Form form={formActions} className="page_actions" name="form_actions" onFinish={onSearch}>
          <Form.Item className="sort" name="sort">
            <Select
              placeholder="Sort people"
              allowClear
              disabled={totalUsers === 0}
              loading={loading}
              onChange={onSort}
            >
              <Option value="nameasc">Name Asc</Option>
              <Option value="namedesc">Name Desc</Option>
              <Option value="created_latest">Created Latest</Option>
              <Option value="created_oldest">Created Oldest</Option>
            </Select>
          </Form.Item>
          <Form.Item className="search" name="search">
            <Input placeholder="Please enter text..." />
          </Form.Item>
          <Form.Item className="finish_form">
            <Button type="primary" icon={<SearchOutlined />} loading={loading} htmlType="submit" />
          </Form.Item>
          <div className="reload">
            <Button
              type="primary"
              icon={<SyncOutlined />}
              loading={loading}
              onClick={() => {
                formActions.resetFields();
                props.getAllUsers();
              }}
            />
          </div>
          <div className="add">
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              loading={loading}
              onClick={() => setShowModalAdd(true)}
            >
              Add people
            </Button>
            <Modal
              title="Add new people"
              destroyOnClose
              centered
              visible={showModalAdd}
              footer={false}
              width={800}
              onCancel={() => setShowModalAdd(false)}
            >
              <UserForm onFinish={onFinishAdd} form={formAdd} />
            </Modal>
          </div>
        </Form>
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
                    src={`https://picsum.photos/id/${user.image_id}/800/400`}
                    fallback={NoImage}
                  />
                }
                actions={[
                  <Popconfirm
                    className="popconfirm_no_footer"
                    key="setting"
                    showCancel={false}
                    icon={<ClockCircleOutlined />}
                    title={moment(new Date(Number(user.created_at))).format('LLL')}
                  >
                    <InfoCircleOutlined />
                  </Popconfirm>,
                  <FormOutlined key="edit" onClick={() => handleEdit(user)} />,
                  <DeleteOutlined key="ellipsis" onClick={() => props.deleteUser(user.id)} />,
                ]}
              >
                <Meta
                  avatar={
                    <Avatar
                      size={38}
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
      <div className="pagination">
        <Pagination
          current={page}
          pageSize={PAGE_SIZE_USERS}
          total={totalUsers}
          showSizeChanger={false}
          hideOnSinglePage
          onChange={onChangePage}
        />
      </div>
      <Modal
        title="Edit people"
        destroyOnClose
        centered
        visible={showModalEdit}
        footer={false}
        width={800}
        onCancel={() => setShowModalEdit(false)}
      >
        <UserForm onFinish={onFinishEdit} form={formEdit} isEditForm={true} />
      </Modal>
    </div>
  );
};

const mapStateToProps = ({ users }: AppState) => ({
  usersList: users.usersList,
  totalUsers: users.totalUsers,
  loading: users.loading,
});

const mapDispatchToProps = { getAllUsers, deleteUser, createUser, editUser };

export default connect(mapStateToProps, mapDispatchToProps)(Users);
