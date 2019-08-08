import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import moment from 'moment';

export const createColumns = (self, dataSource) => [
    {
        title: 'id',
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    },
    {
        title: '企业id',
        name: 'entId',
        formItem: {}
    },
    {
        title: '企业名名称',
        name: 'entName',
        tableItem: {},
        formItem: {},
        searchItem: {
            group: 'abc'
        }
    },{
        title: '会员id',
        name: 'memberId',
        formItem: {}
    },{
        title: '单价',
        name: 'supPrice',
        tableItem: {},
        formItem: {}
    },{
        title: '装车时间',
        name: 'supDate',
        tableItem: {},
        formItem: {
            type: 'datetime',
        }
    },{
        title: '装车地址',
        name: 'supAddress',
        tableItem: {},
        formItem: {}
    },{
        title: '液源厂',
        name: 'supFactory',
        tableItem: {},
        formItem: {}
    },{
        title: '纬度',
        name: 'positionX',
        tableItem: {},
        formItem: {}
    },{
        title: '经度',
        name: 'positionY',
        tableItem: {},
        formItem: {}
    },{
        title: '交易状态',
        name: 'state',
        dict: [
            {code: 0, codeName: '未成交'},
            {code: 1, codeName: '已成交'}
        ],
        tableItem: {},
        formItem: {
            type: 'select',
            // rules: [{required: true, message: '请选择一个状态！'}]
        },
        searchItem: {
            type: 'select',
            group: 'abc'
        }
    },{
        title: '是否有反馈',
        name: 'isoffer',
        dict: [
            {code: 0, codeName: '否'},
            {code: 1, codeName: '是'}
        ],
        formItem: {
            type: 'select',
            // rules: [{required: true, message: '请选择一个状态！'}]
        },
    },{
        title: '信息发布时间',
        name: 'pubDatetime',
        tableItem: {},
        formItem: {
            type: 'datetime',
            showTime: true,
            initialValue: moment()
        }
    } ,
    {
        title: '信息反馈',
        name: 'field2',
        tableItem: {
            width: 80,
            render: (text, record) => (
                <DataTable.Oper>
                    <Button tooltip="信息反馈" onClick={e => self.onRecommended(record)}>
                        <Icon type="message"/>
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

export const createColumns2 = (self, dataSource) => [
    {
        title: '意向咨询',
        name: 'sendList',
        tableItem: {},
        formItem: {
            type: 'table',
            rowKey: 'id',
            titleKey: 'nickname',
            dataSource,
            columns: innerColumns,
            onChange: (form, value, rows) => console.log('。。。:', value, rows),
            loadData: self.onLoadTableData,
            initialValue: [ ]
        }
    }, {
        title: '企业类型',
        name: 'entType',
        dict: [
            {code: 0, codeName: '平台'},
            {code: 1, codeName: '气源厂'},
            {code: 2, codeName: '加气站'},
            {code: 3, codeName: '贸易商'}
        ],
        tableItem: {},
        formItem: {
            type: 'select',
        }
    }
];
const innerColumns = [
    {
        title: '昵称',
        name: 'nickname',
        tableItem: {}
    },{
        title: '用户名',
        name: 'ename',
        tableItem: {}
    },{
        title: '电话',
        name: 'mobile',
        tableItem: {}
    }
];