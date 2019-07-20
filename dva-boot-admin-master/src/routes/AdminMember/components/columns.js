import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export default (self) => [
  {
    title: '昵称',
    name: 'nickname',
    tableItem: {},
    formItem: {}
  },{
    title: '手机号',
    name: 'mobile',
    tableItem: {},
    formItem: {}
  }
  ,
  // {
  //   title: '注册信息',
  //   name: 'comment',
  //   tableItem: {},
  //   formItem: {}
  // },
  // {
  //   title: '个人资料',
  //   name: 'comment',
  //   tableItem: {},
  //   formItem: {}
  // },
  // {
  //   title: '认证信息查看',
  //   name: 'comment',
  //   tableItem: {},
  //   formItem: {}
  // },
  {
    title: '认证信息查看',
    tableItem: {
      render: (text, record) => (
          <DataTable.Oper>
            <Button tooltip="认证信息查看" onClick={e => self.onSetting(record)}>
              <Icon type="plus"/>
            </Button>
          </DataTable.Oper>
      )
    }
  },
  {
    title: '操作',
    tableItem: {
      width: 180,
      render: (text, record) => (
        <DataTable.Oper>
          <Button tooltip="认证信息审核" onClick={e => self.onUpdate(record)}>
            <Icon type="edit" />
          </Button>
          <Button tooltip="删除" onClick={e => self.onDelete(record)}>
            <Icon type="trash" />
          </Button>
        </DataTable.Oper>
      )
    }
  }
];
