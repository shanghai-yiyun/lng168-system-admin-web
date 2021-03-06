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
    },{
        title: 'dataId',
        name: 'dataId',
        formItem: {
            type: 'hidden'
        }
    },{
        title: '类别',
        name: 'type',
        dict: [
            {code: "1", codeName: '采购'},
            {code: "2", codeName: '供应'}
        ],
        tableItem: {},
        formItem: {
            type: 'select',
            rules: [{required: true, message: '请选择一个状态！'}]
        },

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
        formItem: {}
    },{
        title: '会员id',
        name: 'memberId',
        formItem: {}
    },{
        title: '数量',
        name: 'num',
        tableItem: {
            rules: [{required: true},{message:'只能输入数字',pattern: /^[0-9]+$/}]
        },
        formItem: {}
    },{
        title: '装车/卸货时间',
        name: 'date',
        tableItem: {},
        formItem: {
            type: 'date',
        }
    },{
        title: '装货/卸货地址',
        name: 'address',
        tableItem: {},
        formItem: {}
    },{
        title: '液源厂',
        name: 'supFactory',
        formItem: {}
    },{
        title: '单价',
        name: 'supPrice',
        formItem: {
            rules: [{required: true},{message:'只能输入数字',pattern: /^[0-9]+$/}]
        }
    },{
        title: '纬度',
        name: 'position_x',
        tableItem: {},
        formItem: {}
    },{
        title: '经度',
        name: 'position_y',
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
            rules: [{required: true, message: '请选择一个状态！'}]
        },
    },{
        title: '是否有反馈',
        name: 'isOffer',
        dict: [
            {code: "0", codeName: '否'},
            {code: "1", codeName: '是'}
        ],
        formItem: {
            type: 'select',
            rules: [{required: true, message: '请选择一个状态！'}]
        },
    },{
        title: '信息发布时间',
        name: 'pubDate',
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

export const createColumns2 = (self, dataSource,dataSource1,dataSource2) => [
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
    },
    {
        title: '供应抢购信息',
        name: 'sup',
        formItem: {
            type: 'table',
            rowKey: 'id',
            titleKey: 'puEntName',
            dataSource1,
            columns:columnsSupplyOffer,
            onChange: (form, value, rows) => console.log('。。。:', value, rows),
            loadData: self.onLoadSupplyOfferData,
            initialValue: [ ],
            loading:true
        }
    },
    {
        title: '采购报价信息',
        name: 'pur',
        formItem: {
            type: 'table',
            rowKey: 'id',
            titleKey: 'supEntName',
            dataSource2,
            columns:columnsPurchOffer,
            onChange: (form, value, rows) => console.log('。。。:', value, rows),
            loadData: self.onLoadPurchOfferData,
            initialValue: [ ],
            loading:true
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
//供应抢购表
const columnsSupplyOffer = [
    {
        title: 'id',
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    },{
        title: '采购单位ID',
        name: 'purId',
        formItem: {
            type: 'purEntId'
        }
    },{
        title: '采购企业名称',
        name: 'puEntName',
        tableItem: {}
    },{
        title: '采购量',
        name: 'purNum',
        tableItem: {}
    },{
        title: '到货日期',
        name: 'purDate',
        tableItem: {}
    },{
        title: '卸货地址',
        name: 'purAddress',
        tableItem: {}
    },{
        title: '发布时间',
        name: 'pubDatetime',
        tableItem: {
            type: 'datetime',
        }
    },{
        title: '会员ID',
        name: 'memberid',
        tableItem: {}
    }
];
//采购报价表
const columnsPurchOffer = [

    {
        title: 'id',
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    },{
        title: '采购ID',
        name: 'purId',
        formItem: {
            type: 'hidden'
        }
    },{
        title: '液源厂',
        name: 'supFactory',
        tableItem: {}
    },{
        title: '供应单位编号',
        name: 'supEntId',
        tableItem: {}
    },{
        title: '供应企业名称',
        name: 'supEntName',
        tableItem: {}
    },{
        title: '单价',
        name: 'supPrice',
        tableItem: {
            rules: [{required: true},{message:'只能输入数字',pattern: /^[0-9]+$/}]
        }
    },{
        title: '装车时间',
        name: 'supDate',
        tableItem: {}
    },{
        title: '会员ID',
        name: 'memberId',
        tableItem: {}
    },{
        title: '发布时间',
        name: 'puBdatetime',
        tableItem: {}
    }
];