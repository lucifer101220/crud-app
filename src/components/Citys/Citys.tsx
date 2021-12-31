import {
  DeleteOutlined,
  EditOutlined,
  AppstoreAddOutlined,
  SearchOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import {
  Button,
  Form,
  Modal,
  Space,
  Table,
  Popconfirm,
  Tag,
  Menu,
  Dropdown,
  Select,
  Input,
} from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { getAllCitys, deleteCity, createCity, editCity } from '../../reducer/citysReducer';
import { Helmet } from 'react-helmet';
import { IndexedObject } from '../../utils/type';
import { City } from '../../type/type';
import { Params } from '../../application/config/axios-interceptor';
import { AppState } from '../../reducer';
import CityForm from './CityForm';
import './Citys.scss';
import '../Users/Users.scss';

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

const Citys: React.FC<IndexedObject> = (props) => {
  type FormActions = {
    search: string;
  };

  const { citysList, totalCitys, loading } = props;
  const [formActions] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

  useEffect(() => {
    props.getAllCitys();
  }, []);

  //Table
  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: '22%',
      render: (text: string) => text,
    },
    {
      key: 'state',
      title: 'State',
      dataIndex: 'state',
      width: '22%',
      render: (text: string) => text,
    },
    {
      key: 'zip_code',
      title: 'Zip code',
      dataIndex: 'zip_code',
      width: '22%',
      render: (text: string) => text,
    },
    {
      key: 'country',
      title: 'Country',
      dataIndex: 'country',
      width: '22%',
      render: (text: string) => text,
    },
    {
      key: 'action',
      title: 'Actions',
      width: '12%',
      render: (record: City) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined onClick={() => props.deleteCity(record.id)} />
        </Space>
      ),
    },
  ];
  //End Table

  //Data
  const onSearch = (values: FormActions) => {
    if (!values.search) {
      props.getAllCitys();
    } else {
      const params: Params = {
        search: values.search,
      };
      props.getAllCitys(params);
    }
  };

  const onFinishAdd = useCallback((values: City) => {
    const data = {
      ...values,
      created_at: Date.now(),
    };
    props.createCity(data);
    setShowModalAdd(false);
    formAdd.resetFields();
  }, []);

  const handleEdit = (city: City) => {
    formEdit.setFieldsValue(city);
    setShowModalEdit(true);
  };

  const onFinishEdit = useCallback((values: City) => {
    const data = {
      ...values,
      created_at: Date.now(),
    };
    props.editCity(data);
    setShowModalEdit(false);
    formEdit.resetFields();
  }, []);
  //End Data

  return (
    <div className="page citys_page">
      <Helmet>
        <title>Citys</title>
      </Helmet>
      <div className="page_header">
        <div className="total_items">
          <p>
            Total citys : <span>{totalCitys}</span>
          </p>
        </div>
        <Form form={formActions} className="page_actions" name="form_actions" onFinish={onSearch}>
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
                props.getAllCitys();
              }}
            />
          </div>
          <div className="add">
            <Button
              type="primary"
              icon={<AppstoreAddOutlined />}
              loading={loading}
              onClick={() => setShowModalAdd(true)}
            >
              Add city
            </Button>
            <Modal
              title="Add new city"
              destroyOnClose
              centered
              visible={showModalAdd}
              footer={false}
              width={800}
              onCancel={() => setShowModalAdd(false)}
            >
              <CityForm onFinish={onFinishAdd} form={formAdd} />
            </Modal>
            <Modal
              title="Edit city"
              destroyOnClose
              centered
              visible={showModalEdit}
              footer={false}
              width={800}
              onCancel={() => setShowModalEdit(false)}
            >
              <CityForm onFinish={onFinishEdit} form={formEdit} isEditForm={true} />
            </Modal>
          </div>
        </Form>
      </div>
      <div className="table-data">
        <Table
          scroll={{ x: 900 }}
          loading={loading}
          rowKey={(record: { id: any }) => record.id}
          columns={columns}
          dataSource={citysList}
          bordered
          pagination={{
            defaultPageSize: 10,
            hideOnSinglePage: true,
            pageSizeOptions: ['10', '20', '30'],
          }}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({ citys }: AppState) => ({
  citysList: citys.citysList,
  totalCitys: citys.totalCitys,
  loading: citys.loading,
});

const mapDispatchToProps = { getAllCitys, deleteCity, createCity, editCity };

export default connect(mapStateToProps, mapDispatchToProps)(Citys);
