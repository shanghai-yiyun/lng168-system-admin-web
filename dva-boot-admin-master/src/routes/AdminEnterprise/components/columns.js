import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export const createColumns = (self) => [
    {
        title: '企业id',
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    },{
        title: '企业名称',
        name: 'entTitle',
        tableItem: {},
        formItem: {rules: [{required: true}]},
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '企业编号',
        name: 'entBh',
        tableItem: {},
        formItem: {rules: [{required: true}]},
        searchItem: {
            group: 'abc'
        }
    },
    {
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
            rules: [{required: true, message: '请选择一个类型！'}]
        }
    }, {
        title: '地址',
        name: 'entAddress',
        tableItem: {},
        formItem: {rules: [{required: true}]},
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '电话',
        name: 'entPhone',
        tableItem: {},
        formItem: {rules: [{required: true}]},
        searchItem: {
            group: 'abc'
        }
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
                    <Button tooltip="资质" onClick={e => self.onSetting(record)}>
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
        title: '标题说明',
        name: 'title',
        tableItem: {},
        formItem: {rules: [{required: true}]},
    },
    {
        title: '营业执照号',
        name: 'entbh',
        tableItem: {},
        formItem: {rules: [{required: true}]},
    },{
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
    },{
        title: '企业人员',
        name: 'workEmployees',
        tableItem: {},
        formItem: {},
    },{
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

    },{
        title: '备注',
        name: 'memo',
        tableItem: {},
        formItem: {}
    },{
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
            max: 10,//上传图片数量最大限制
            isHidden:false,
            isHandleRemove:true,
        }
    },{
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
