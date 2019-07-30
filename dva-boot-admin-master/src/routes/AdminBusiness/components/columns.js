import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import moment from 'moment';

export default (self) => [
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
        tableItem: {},
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
        formItem: {}
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
        title: '发布时间',
        name: 'pubDate',
        tableItem: {},
        formItem: {
            type: 'datetime',
            showTime: true,
            initialValue: moment()
        }
    },
    {
        title: '推送消息',
        tableItem: {
            render: (text, record) => (
                <DataTable.Oper>
                    <Button tooltip="推送消息" onClick={e => self.onSetting(record)}>
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
