import {
  DeleteOutlined,
  EditOutlined,
  AppstoreAddOutlined,
  SearchOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Button, Form, Modal, Space, Table, Input } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  getAllCompanys,
  deleteCompany,
  createCompany,
  editCompany,
} from '../../reducer/companysReducer';
import { Helmet } from 'react-helmet';
import { IndexedObject } from '../../utils/type';
import { Company } from '../../type/type';
import { Params } from '../../application/config/axios-interceptor';
import { AppState } from '../../reducer';
import CompanyForm from './CompanyForm';
import '../Users/Users.scss';
import '../Citys/Citys.scss';

const Companys: React.FC<IndexedObject> = (props) => {
  type FormActions = {
    search: string;
  };

  const { companysList, totalCompanys, loading } = props;
  const [formActions] = Form.useForm();
  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [showModalAdd, setShowModalAdd] = useState<boolean>(false);
  const [showModalEdit, setShowModalEdit] = useState<boolean>(false);

  useEffect(() => {
    props.getAllCompanys();
  }, []);

  //Table
  const columns = [
    {
      key: 'name',
      title: 'Name',
      dataIndex: 'name',
      width: '25%',
      render: (text: string) => text,
    },
    {
      key: 'bs',
      title: 'BS',
      dataIndex: 'bs',
      width: '25%',
      render: (text: string) => text,
    },
    {
      key: 'suffix',
      title: 'Suffix',
      dataIndex: 'suffix',
      width: '16%',
      render: (text: string) => text,
    },
    {
      key: 'adjective',
      title: 'Adjective',
      dataIndex: 'adjective',
      width: '22%',
      render: (text: string) => text,
    },
    {
      key: 'action',
      title: 'Actions',
      width: '12%',
      render: (record: Company) => (
        <Space size="middle">
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined onClick={() => props.deleteCompany(record.id)} />
        </Space>
      ),
    },
  ];
  //End Table

  //Data
  const onSearch = (values: FormActions) => {
    if (!values.search) {
      props.getAllCompanys();
    } else {
      const params: Params = {
        search: values.search,
      };
      props.getAllCompanys(params);
    }
  };

  const onFinishAdd = useCallback((values: Company) => {
    const data = {
      ...values,
      created_at: Date.now(),
    };
    props.createCompany(data);
    setShowModalAdd(false);
    formAdd.resetFields();
  }, []);

  const handleEdit = (company: Company) => {
    formEdit.setFieldsValue(company);
    setShowModalEdit(true);
  };

  const onFinishEdit = useCallback((values: Company) => {
    const data = {
      ...values,
      created_at: Date.now(),
    };
    props.editCompany(data);
    setShowModalEdit(false);
    formEdit.resetFields();
  }, []);
  //End Data

  return (
    <div className="page companys_page">
      <Helmet>
        <title>Companys</title>
      </Helmet>
      <div className="page_header">
        <div className="total_items">
          <p>
            Total companys : <span>{totalCompanys}</span>
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
                props.getAllCompanys();
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
              Add company
            </Button>
            <Modal
              title="Add new company"
              destroyOnClose
              centered
              visible={showModalAdd}
              footer={false}
              width={800}
              onCancel={() => setShowModalAdd(false)}
            >
              <CompanyForm onFinish={onFinishAdd} form={formAdd} />
            </Modal>
            <Modal
              title="Edit company"
              destroyOnClose
              centered
              visible={showModalEdit}
              footer={false}
              width={800}
              onCancel={() => setShowModalEdit(false)}
            >
              <CompanyForm onFinish={onFinishEdit} form={formEdit} isEditForm={true} />
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
          dataSource={companysList}
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

const mapStateToProps = ({ companys }: AppState) => ({
  companysList: companys.companysList,
  totalCompanys: companys.totalCompanys,
  loading: companys.loading,
});

const mapDispatchToProps = { getAllCompanys, deleteCompany, createCompany, editCompany };

export default connect(mapStateToProps, mapDispatchToProps)(Companys);
