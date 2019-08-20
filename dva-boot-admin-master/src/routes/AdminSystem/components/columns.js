import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export const createColumns = (self) => [
    {
        title: 'id',
        name: 'id',
        tableItem: {},
        formItem: {
            type: 'hidden'
        }
    }, {
        title: '参数代码',
        name: 'code',
        tableItem: {},
        formItem: {rules: [{required: true, message: '参数代码不能为空！'}]},
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '参数名称',
        name: 'name',
        tableItem: {},
        formItem: {rules: [{required: true, message: '参数名称不能为空！'}]},
        searchItem: {
            group: 'abc'
        }
    },
    {
        title: '参数值',
        name: 'value',
        tableItem: {},
        formItem: {
            rules: [{required: true, message: '参数值不能为空！'}]
        }
    },
    {
        title: '参数描述',
        name: 'description',
        tableItem: {},
        formItem: {
            rules: [{required: true, message: '参数描述不能为空！'}]
        }
    },{
        title: '操作',
        tableItem: {
            width: 180,
            render: (text, record) => (
                <DataTable.Oper>
                    <Button tooltip="编辑" onClick={e => self.onUpdate(record)}>
                        <Icon type="edit"/>
                    </Button>
                    <Button tooltip="删除" onClick={e => self.onDelete(record)}>
                        <Icon type="trash"/>
                    </Button>
                </DataTable.Oper>
            )
        }
    }
];
