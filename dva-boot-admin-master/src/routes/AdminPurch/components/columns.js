import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export default (self) => [
    {
        title: 'id',
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    },
    {
        title: '采购单位',
        name: 'ent_bh',
        tableItem: {},
        formItem: {}
    },
    {
        title: '发布时间',
        name: 'pub_datetime',
        tableItem: {},
        formItem: {}
    },{
        title: '采购量',
        name: 'pur_num',
        tableItem: {},
        formItem: {}
    },{
        title: '卸货地址',
        name: 'pur_address',
        tableItem: {},
        formItem: {}
    },{
        title: '会员ID',
        name: 'memberid',
        tableItem: {},
        formItem: {}
    },{
        title: '是否报价',
        name: 'isoffer',
        tableItem: {},
        formItem: {}
    },
    {
        title: '详细信息',
        tableItem: {
            render: (text, record) => (
                <DataTable.Oper>
                    <Button tooltip="设置" onClick={e => self.onSetting(record)}>
                        报价详情
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
