import React,{useState} from 'react';
import { Modal, Button, Dropdown, Menu, Popconfirm } from 'antd';
import {
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { ConsoleSqlOutlined, DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { useRequest } from 'umi';
import { queryCurrent } from '../service';
import styles from './permission.less';

import {
  SaveOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { assertFlowBaseAnnotation } from '@babel/types';


export type TableListItem = {
  key: number;
  name: string;
  permission?: string;
  createdAt: number;
  isEdit: boolean;
};


const PermissionView: React.FC = () => {
  const { loading } = useRequest(() => {
    return queryCurrent();
  });
  
  // difinition
  const getInitialData = () => {
    const res = [];
    const creators = ['Administrator', 'User1', 'User2', 'User3', 'Guest'];
    const permissions = ['Administrator', 'Operator', 'Analytist', 'Operator', 'Operator'];
    for (let i = 0; i < 5; i += 1) {
      res.push({
        key: i,
        name: creators[i],
        permission: permissions[i],
        createdAt: Date.now() - Math.floor(Math.random() * (i * 10000) * 100000),
        isEdit: false
      });
    }
    return res;
  }

  const getRoleMenu = (record:any) => {
    const selectItem = (e:any, record: any) => {
      dataSource.map((ds) => {
        if (ds.key === record.key) {
          ds.permission = e.key
        }
      })
      setDataSource(dataSource)
      setSetColumn(getColumns());
    }

    return (
      <Menu onClick={(e) => selectItem(e,record)}>
        <Menu.Item key="Administrator">Administrator</Menu.Item>
        <Menu.Item key="Operator">Operator</Menu.Item>
        <Menu.Item key="Analytist">Analytist</Menu.Item>
      </Menu>
    )
  };

  const getColumns = () => {
    const columns: ProColumns<TableListItem>[] = [
      {
        title: 'User',
        width: 400,
        dataIndex: 'name',
        render: (_) => <a>{_}</a>,
      },
      {
        title: 'Role',
        width: 400,
        dataIndex: 'permission',
        render: (_, record) => {
          const editNode = (
          <Dropdown overlay={getRoleMenu(record)} trigger={['click']}>
            <p className='permission'>
                {_}<DownOutlined />
            </p>
          </Dropdown>)
          const viewNode = (<p>{_}</p>)
          return record.isEdit ? editNode : viewNode;
        },
      },
      {
        title: 'Last updated',
        width: 300,
        key: 'updated',
        dataIndex: 'createdAt',
        valueType: 'date',
      },
      {
        title: 'Action',
        width: 180,
        key: 'option',
        valueType: 'option',
        render: (_, record) => [
          !record.isEdit ? <EditOutlined className={styles.actions} onClick={() => changeMode(record)} /> : <SaveOutlined className={styles.actions} onClick={() => saveData(record)} />,
          !record.isEdit ? <DeleteOutlined className={styles.actions} onClick={() => deleteData(record)} />: null
        ],
      },
    ];
    return columns;
  }

  const changeMode = (record: any) => {
    dataSource.map((ds) => {
      if(ds.key === record.key) {
        ds.isEdit = !ds.isEdit
      }
    })
    setDataSource(dataSource)
    setSetColumn(getColumns());
  }

  const saveData = (record: any) => {
    dataSource.map((ds) => {
      if (ds.key === record.key) {
        ds.isEdit = false
      }
    })
    setDataSource(dataSource)
    setSetColumn(getColumns());
  }

  const deleteData = (record: any) => {
  }


  // use state
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState(getInitialData);
  const [setColumn, setSetColumn] = useState(getColumns);


  console.log(dataSource)
  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.listview}>
            <div>
              <Button type="primary" key="primary" onClick={() => setModalVisible(true)}>+ add</Button>
            </div>

            <div>
              <ProTable<TableListItem>
                columns={setColumn}
                request={(params, sorter, filter) => {
                  return Promise.resolve({
                    data: dataSource,
                    success: true,
                  });
                }}
                rowKey="key"
                pagination={{
                  showQuickJumper: true,
                }}
                search={false}
                dateFormatter="string"
                headerTitle=""
                toolBarRender={false}
              />
            </div>

          </div>
        </>
      )}

      <Modal
        title="User registration"
        centered
        visible={modalVisible}
        onOk={() => { setModalVisible(false); }}
        onCancel={() => setModalVisible(false)}
      >
        <ProFormText
          initialValue=""
          width="md"
          name="userName"
          label="User"
          rules={[
            {
              required: true,
              message: 'Please input UserName!',
            },
          ]}
        />
        <ProFormSelect
          initialValue="operator"
          width="sm"
          name="role"
          label="Role"
          rules={[
            {
              required: true,
              message: 'Please select role',
            },
          ]}
          options={[
            {
              label: 'Administrator',
              value: 'administrator',
            },
            {
              label: 'Operator',
              value: 'operator',
            },
            {
              label: 'Analytist',
              value: 'analytist',
            },
          ]}
        />
      </Modal>
      
    </div>
  );
};

export default PermissionView;
