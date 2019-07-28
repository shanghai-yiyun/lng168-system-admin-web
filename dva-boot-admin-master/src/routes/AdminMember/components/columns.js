import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';
import moment from 'moment';
import { Empty } from 'antd';

export const createColumns = (self) => [
    {
        title: '会员id',
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    },{
        title: '昵称',
        name: 'nickname',
        tableItem: {},
        formItem: {rules: [{required: true}]},
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '手机号',
        name: 'mobile',
        tableItem: {},
        formItem: {rules: [{required: true}]},
        searchItem: {
            group: 'abc'
        }
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
            rules: [{required: true, message: '请选择一个级别类型！'}]
        }
    },
    {
        title: '用户类型',
        name: 'type',
        dict: [
            {code: 0, codeName: '模拟用户'},
            {code: 1, codeName: '真是用户'}
        ],
        tableItem: {},
        formItem: {
            type: 'select',
            rules: [{required: true, message: '请选择一个用户类型！'}]
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
            rules: [{required: true}]
        }
    // },
    // {
    //     title: '认证信息',
    //     tableItem: {
    //         render: (text, record) => (
    //             <DataTable.Oper>
    //                 <Button tooltip="认证信息" onClick={e => self.onSetting(record)}>
    //                     <Icon type="plus"/>
    //                 </Button>
    //             </DataTable.Oper>
    //         )
    //     }
    },
    {
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
                    <Button tooltip="认证" onClick={e => self.onSetting(record)}>
                        <Icon type="plus"/>
                    </Button>
                </DataTable.Oper>
            )
        }
    }
];

export const columns2 = [
    {
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    },
    {
        name: 'pid',
        formItem: {
            type: 'hidden'
        }
    },
    {
        name: 'entid',
        formItem: {
            type: 'hidden'
        }
    },
    {
        name: 'entbh',
        formItem: {
            type: 'hidden'
        }
    },
    {
        title: '所属企业',
        name: 'entName',
        tableItem: {},
        formItem: {rules: [{required: true}]},
    },
    {
        title: '标题说明',
        name: 'title',
        tableItem: {},
        formItem: {rules: [{required: true}]},
    },
    {
        title: '类型',
        name: 'type',
        dict: [
            {code: 1, codeName: '企业'},
            {code: 2, codeName: '会员'}
        ],
        formItem: {
            type: 'select',
            rules: [{required: true, message: '请选择一个角色类型！'}]
        }
    },
    {
        title: '状态',
        name: 'state',
        dict: [
            {code: 1, codeName: '正常'},
            {code: 0, codeName: '待审核'}
        ],
        formItem: {
            type: 'select',
            rules: [{required: true, message: '请选择一个状态！'}]
        },

    },
    {
        title: '备注',
        name: 'memo',
        tableItem: {},
        formItem: {}
    },
    {
        title: '用户认证信息',
        name: 'url',
        tableItem: {
        },
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
            isHidden:true,
            isHandleRemove:false
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
