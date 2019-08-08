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
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '昵称',
        name: 'nickname',
        tableItem: {},
        formItem: {},
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '手机号',
        name: 'mobile',
        tableItem: {},
        formItem: {},
        searchItem: {
            group: 'abc'
        }
    // } ,{
    //     title: '企业名称',
    //     name: 'entName',
    //     tableItem: {},
    },
    {
        title: '会员级别',
        name: 'memberLevel',
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
        title: '注册时间',
        name: 'timei',
        tableItem: {},
    }, {
        title: '用户类型',
        name: 'type',
        dict: [
            {code: 0, codeName: '模拟用户'},
            {code: 1, codeName: '真实用户'}
        ],
        tableItem: {},
        formItem: {
            type: 'select',
            // rules: [{required: true, message: '请选择一个用户类型！'}]
        }
    },
    {
        title: '截止日期',
        name: 'closingDate',
        tableItem: {},
        formItem: {
            type: 'datetime',
            showTime: true,
            initialValue: moment(),
            // rules: [{required: true}]
        }
    }, {
        title: '审核状态',
        name: 'cerStatus',
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
        title: '推荐号',
        name: 'referralCode',
        formItem: {},
    }, {
        title: '操作',
        tableItem: {
            width: 180,
            render: (text, record) => (
                <DataTable.Oper>
                    <Button tooltip="详情" onClick={e => self.onUpdate(record)}>
                        <Icon type="edit"/>
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
            // isHidden: true,
            // isHandleRemove: false
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
