import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export const createColumns = (self) => [
    {
        title: 'id',
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    },{
        title: '推送类型',
        name: 'type',
        tableItem: {},
        dict: [
            {code: 0, codeName: '订单推送'},
            {code: 1, codeName: '新闻推送'},
            {code: 2, codeName: '供应推送'},
            {code: 3, codeName: '采购推送'},
            {code: 41, codeName: '报价回复'},
            {code: 42, codeName: '抢购回复'},
            {code: 5, codeName: '聊天推送'}
        ],
        formItem: {
            type: 'select',
            rules: [{required: true}]
        }
    },{
        title: '操作员',
        name: 'operatorName',
        tableItem: {},
        formItem: {rules: [{required: true}]},
        searchItem: {
            group: 'abc'
        }
    },{
        title: '推送时间',
        name: 'timei',
        tableItem: {},
        disabled: true,
        formItem: {
            type: 'datetime',
        },
    },
    {
        title: '通知标题',
        name: 'notificationTitle',
        // tableItem: {},
        formItem: {
            rules: [{required: true}]
        }
    },
    {
        title: '信息标题',
        name: 'msgTitle',
        tableItem: {},
        formItem: {
            rules: [{required: true}]
        }
    },
    {
        title: '信息内容',
        name: 'msgContent',
        tableItem: {},
        formItem: {
            rules: [{required: true}]
        }
    },
    {
        title: '推送接收人',
        name: 'receivers_info',
        tableItem: {},
        formItem: {
            rules: [{required: true}]
        }
    },{
        title: '推送状态',
        name: 'state',
        tableItem:{},
        dict: [
            {code: 0, codeName: '新消息'},
            {code: 1, codeName: '发送成功'},
            {code: 2, codeName: '已阅读'}
        ],
        formItem: {
            type: 'select',
            rules: [{ required:true,message: '请选择一个状态！'}]
        },
        searchItem: {
            type: 'select',
            group: 'abc'
        }
    },{
        title: '操作',
        tableItem: {
            width: 180,
            render: (text, record) => (
                <DataTable.Oper>
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
