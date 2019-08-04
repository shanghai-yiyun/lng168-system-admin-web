import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import moment from 'moment';

export const createColumns = (self) => [
    {
        title: '会员id',
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    }, {
        title: '用户名',
        name: 'ename',
        tableItem: {},
        formItem: {},
        disabled: true,
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '昵称',
        name: 'nickname',
        tableItem: {},
        disabled: true,
        formItem: {},
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '手机号',
        name: 'mobile',
        tableItem: {},
        disabled: true,
        formItem: {},
        searchItem: {
            group: 'abc'
        }
    },
    {
        title: '会员级别',
        name: 'memberLevel',
        disabled: true,
        dict: [
            {code: 0, codeName: '游客'},
            {code: 1, codeName: '试用期有效会员'},
            {code: 2, codeName: '会员'},
            {code: 3, codeName: '过期会员'}
        ],
        tableItem: {},
        formItem: {
            type: 'select',
            // rules: [{required: true, message: '请选择一个级别类型！'}]
        }
    }, {
        title: '截止日期',
        name: 'closingDate',
        disabled: true,
        formItem: {
            type: 'date',
        },
    },
    {
        title: '用户类型',
        name: 'type',
        dict: [
            {code: 0, codeName: '模拟用户'},
            {code: 1, codeName: '真是用户'}
        ],
        tableItem: {},
        disabled: true,
        formItem: {
            type: 'select',
            // rules: [{required: true, message: '请选择一个用户类型！'}]
        }
    },
    {
        title: '截止日期',
        name: 'closingDate',
        disabled: true,
        tableItem: {},
        formItem: {
            type: 'datetime',
            showTime: true,
            initialValue: moment(),
            // rules: [{required: true}]
        }
    }, {
        title: '审核状态',
        disabled: true,
        name: 'cer_status',
        dict: [
            {code: 0, codeName: '未审核'},
            {code: 1, codeName: '已通过'},
            {code: 2, codeName: '已驳回'},
        ],
        tableItem: {},
        formItem: {type: 'select'},
        searchItem: {
            group: 'abc',
            type: 'select'
        }
    }, {
        title: '最后一次在线时间',
        disabled: true,
        name: 'appLastOnlineTime',
        formItem: {},
    }, {
        title: '推荐号',
        disabled: true,
        name: 'referralCode',
        formItem: {},
    }, {
        title: '操作',
        tableItem: {
            width: 180,
            render: (text, record) => (
                <DataTable.Oper>
                    <Button tooltip="详情" onClick={e => self.onUpdate(record)}>
                        <Icon type="enlarge"/>
                    </Button>
                    <Button tooltip="删除" onClick={e => self.onDelete(record)}>
                        <Icon type="trash"/>
                    </Button>
                    <Button tooltip="认证" onClick={e => self.onSetting(record)}>
                        <Icon type="check"/>
                    </Button>
                </DataTable.Oper>
            )
        }
    }
];

export const columns2 = [
    {
        name: 'membeId',
        formItem: {
            type: 'hidden'
        }
    },
    {
        name: 'entId',
        formItem: {
            type: 'hidden'
        }
    },
    {
        title: '公司名称',
        name: 'entName',
        disabled: true,
        tableItem: {},
        formItem: {rules: [{required: true}]},
    },
    {
        title: '营业执照号',
        name: 'entBh',
        disabled: true,
        formItem: {
            rules: [{required: true}]
        }
    },
    {
        title: '公司类型',
        name: 'entType',
        disabled: true,
        dict: [
            {code: "0", codeName: '平台'},
            {code: "1", codeName: '气源厂'},
            {code: "2", codeName: '加气站'},
            {code: "3", codeName: '贸易商'}
        ],
        formItem: {
            type: 'select',
            rules: [{required: true, message: '请选择一个类型！'}]
        }
    },
    {
        title: '公司地址',
        name: 'entAddress',
        disabled: true,
        formItem: {},

    },
    {
        title: '公司电话',
        name: 'entMobile',
        disabled: true,
        formItem: {}
    },
    {
        title: '用户认证信息',
        name: 'url',
        disabled: true,
        tableItem: {},
        formItem: {
            type: 'upload',
            initialValue: [],
            rules: [
                {
                    required: true,
                    message: '请选择用户认证图片'
                }
            ],
            maxFileSize: 1000, // 最大限制 kb
            fileTypes: ['.png', '.jpg', '.gif'], // 允许类型
            max: 10,
            isHidden: true,
            isHandleRemove: false
        }
    },
    {
        title: '审批',
        name: 'approval',
        dict: [
            {code: "1", codeName: '通过'},
            {code: "0", codeName: '驳回'},
            {code: "3", codeName: '未审核'}
        ],
        formItem: {
            type: 'select',
            rules: [{required: true, message: '请选择一个状态！'}]
        },

    }
];
