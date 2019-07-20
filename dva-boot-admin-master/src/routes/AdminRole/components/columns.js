import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export default (self) => [
  {
    title: '角色ID',
    name: 'id',
    tableItem: {},
    formItem: {}
  },{
    title: '角色名称',
    name: 'name',
    tableItem: {},
    formItem: {}
  }
  ,
  {
    title: '描述',
    name: 'comment',
    tableItem: {},
    formItem: {}
  },
  {
    title: '权限设置',
    tableItem: {
      render: (text, record) => (
          <DataTable.Oper>
            <Button tooltip="设置" onClick={e => self.onSetting(record)}>
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
          <Button tooltip="修改" onClick={e => self.onUpdate(record)}>
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
