import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export const createColumns = (self,provinces,cities,countries) => [
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
        formItem: {rules: [{required: true, message: '企业名称不能为空！'}]},
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '企业编号',
        name: 'entBh',
        tableItem: {},
        formItem: {rules: [{required: true, message: '企业编号不能为空！'}]},
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
        },
        searchItem: {
            type: 'select',
        }
    }, {
        title: '地址',
        name: 'entAddress',
        tableItem: {},
        formItem: {},
        searchItem: {
        }
    }, {
        title: '固定电话',
        name: 'entPhone',
        tableItem: {},
        formItem: {},
        searchItem: {
        }
    }, {
        title: '省份',
        name: 'entProvince',
        dict:provinces,
        formItem: {
            rules: [{required: true, message: '省份不能为空！'}],
            type:'select',
            showSearch:true,
            optionFilterProp:'children',
            onChange: (form, value, rows) => self.getSubCities(value,form),
        // },
        // searchItem: {
        //     group: 'abc'
        }
    }, {
        title: '城市',
        name: 'entCity',
        dict:cities,
        formItem: {
            rules: [{required: true, message: '城市不能为空！'}],
            type: 'select',
            showSearch: true,
            optionFilterProp: 'children',
            onChange: (form, value, rows) => self.getSubCountries(value,form),
        }
    }, {
        title: '县区',
        name: 'entCounty',
        dict:countries,
        formItem: {
            rules: [{required: true, message: '县区不能为空！'}],
            type: 'select',
            showSearch: true,
            optionFilterProp: 'children',
        }
    }, {
        title: '邮编',
        name: 'entZipcode',
        formItem: {},
    }, {
        title: '联系人',
        name: 'entContact',
        formItem: {},
    }, {
        title: '手机',
        name: 'entMobile',
        formItem: {
            rules:[{ pattern: /^1[3|5|7|8|9][0-9]\d{8}$/, message: "手机号码格式不正确"}]
        },
    }, {
        title: '企业网址',
        name: 'entUrl',
        formItem: {},
    }, {
        title: '备注',
        name: 'entMemo',
        formItem: {},
    }, {
        title: '经度',
        name: 'entX',
        formItem: {},
    }, {
        title: '纬度',
        name: 'entY',
        formItem: {},
    }, {
        title: '是否会员企业',
        name: 'entMember',
        dict: [
            {code: 0, codeName: '非会员企业'},
            {code: 1, codeName: '会员企业'},
        ],
        formItem: {
            type: 'select',
        },
    }, {
        title: '企业置顶1',
        name: 'entTop',
        formItem: {},
    }, {
        title: '企业推荐1',
        name: 'entRec',
        formItem: {},
    }, {
        title: '企业短名',
        name: 'entShort',
        formItem: {},
    }, {
        title: '警告标志',
        name: 'entWarnSign',
        formItem: {},
    }, {
        title: '警告内容',
        name: 'entWarnContent',
        formItem: {},
    }, {
        title: '企业分区标志',
        name: 'entArea',
        formItem: {},
    }, {
        title: '更新时间',
        name: 'timeu',
        tableItem: {}
    }, {
        title: '指数计算标志',
        name: 'entMark',
        dict: [
            {code: 0, codeName: '计算'},
            {code: 1, codeName: '不计算'},
        ],
        formItem: {
            type: 'select',
        },
    }, {
        title: '企业推荐模板',
        name: 'templateType',
        formItem: {},
    }, {
        title: '企业状态',
        name: 'entState',
        dict: [
            {code: 0, codeName: '未运营'},
            {code: 1, codeName: '运营'},
            {code: 2, codeName: '未确认'}
        ],
        formItem: {
            type: 'select',
        },
    },{
        title: '审核状态',
        name: 'cerStatus',
        dict: [
            {code: 1, codeName: '已审核'},
            {code: 2, codeName: '审核中'},
            {code: 3, codeName: '审核失败'},
        ],
        tableItem: {},
        formItem: {type: 'select'},
        searchItem: {
            type: 'select'
        }
    },{
        title: '认证状态',
        name: 'fddStatus',
        dict: [
            {code: 0, codeName: '未认证'},
            {code: 1, codeName: '管理员资料已提交'},
            {code: 2, codeName: '企业基本资料(没有申请表)已提交'},
            {code: 3, codeName: '已提交待审核'},
            {code: 4, codeName: '审核通过'},
            {code: 5, codeName: '审核不通过'},
            {code: 6, codeName: '人工初审通过'},
        ],
        tableItem: {},
        disabled:true,
        formItem: {type: 'select'},
        searchItem: {
            type: 'select'
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
                        <Icon type="check"/>
                    </Button>
                    <Button tooltip="新增气质报告" onClick={e => self.onSetting2(record)}>
                        <Icon type="plus"/>
                    </Button>
                    <Button tooltip="查看气质报告" onClick={e => self.onSetting3(record)}>
                        <Icon type="lines"/>
                    </Button>
                </DataTable.Oper>
            )
        }
    }
];

export const columns2 = [
    {
        name: 'entId',
        formItem: {
            type: 'hidden'
        }
    },
    {
        title: '企业名称',
        name: 'entName',
        disabled:true,
        tableItem: {},
        formItem: {rules: [{required: true, message: '企业名称不能为空！'}]},
    },
    {
        title: '营业执照号',
        name: 'entBh',
        disabled:true,
        tableItem: {},
        formItem: {rules: [{required: true, message: '营业执照号不能为空！'}]},
    },{
        title: '公司类型',
        name: 'entType',
        disabled:true,
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
    },{
        title: '企业人员',
        name: 'workEmployees',
        disabled:true,
        tableItem: {},
        formItem: {},
    },{
        title: '企业认证信息',
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
            listType:"picture",
            maxFileSize: 1000, // 最大限制 kb
            fileTypes: ['.png', '.jpg', '.gif'], // 允许类型
            max: 10,//上传图片数量最大限制
            isHidden:false,
            isHandleRemove:true,
            // action: 'http://localhost:3000/article-gate/business/file/upload?fileType=image&subType=certificate'
            action: 'http://s.lng168.com/article-gate/business/file/upload?fileType=image&subType=certificate'
        }
    }
];
export const columns3 = [
    {
        name: 'entId',
        formItem: {
            type: 'hidden'
        }
    },{
        title: '气质报告',
        name: 'fileList',
        formItem: {
            type: 'upload',
            initialValue: [],
            rules: [
                {
                    required: true,
                    message: '请上传气质报告'
                }
            ],
            listType:"picture",
            maxFileSize: 1000, // 最大限制 kb
            fileTypes: ['.png', '.jpg', '.gif'], // 允许类型
            max: 1,//上传图片数量最大限制
            // action: 'http://localhost:3000/article-gate/business/file/upload?fileType=image&subType=report'
            action: 'http://s.lng168.com/article-gate/business/file/upload?fileType=image&subType=report'
        }
    },    {
        title: '备注',
        name: 'memo',
        tableItem: {},
        formItem: {},
    }
];
