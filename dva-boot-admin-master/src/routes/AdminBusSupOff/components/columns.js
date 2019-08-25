import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import moment from 'moment';

export const createColumns = (self) => [
    {
        title: 'id',
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    },{
        title: '供应发布会员名称',
        tableItem: {},
        name: 'supName',
        formItem: {
        }
    },{
        title: '会员信息发布时间',
        name: 'pubDatetime',
        tableItem: {
            type: 'datetime',
        }
    },{
        title: '采购企业名称',
            name: 'purEntName',
        tableItem: {},
        formItem: {}
    },{
        title: '采购量',
        name: 'purNum',
        tableItem: {},
        formItem: {}
    },{
        title: '到货日期',
        name: 'purDate',
        tableItem: {},
        formItem: {
            type: 'datetime',
        }
    },{
        title: '卸货地址',
        name: 'purAddress',
        tableItem: {},
        formItem: {}
    },{
        title: '抢购会员名称',
        name: 'nickName',
        tableItem: {},
        formItem: {}
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
                    <Button tooltip="推送" onClick={e => self.onSend(record)}>
                        <Icon type="message"/>
                    </Button>
                </DataTable.Oper>
            )
        }
    }
];
