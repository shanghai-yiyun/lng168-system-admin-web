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
        title: '发布采购会员名称',
        name: 'purName',
        tableItem: {},
        formItem: {},
    },{
        title: '液源厂',
        name: 'supFactory',
        formItem: {},
        tableItem: {}
    // },{
    //     title: '供应单位编号',
    //     name: 'supEntId',
    //     formItem: {},
    //     tableItem: {}
    },{
        title: '供应企业名称',
        name: 'supEntName',
        formItem: {},
        tableItem: {}
    },{
        title: '单价',
        name: 'supPrice',
        formItem: {},
        tableItem: {}
    },{
        title: '装车时间',
        name: 'supDate',
        formItem: {
            type: 'date',
        }
    },{
        title: '报价会员名称',
        name: 'nickName',
        formItem: {},
        tableItem: {}
    },{
        title: '纬度',
        name: 'positionX',
        formItem: {}
    },{
        title: '经度',
        name: 'positionY',
        formItem: {}
    },{
        title: '发布时间',
        name: 'pubDatetime',
        formItem: {
            type: 'datetime',
            showTime: true,
            initialValue: moment()
        },
        tableItem: {}
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
