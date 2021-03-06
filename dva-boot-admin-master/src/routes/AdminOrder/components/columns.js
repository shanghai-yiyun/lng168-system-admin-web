import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export const createColumns = (self,ents) => [
    {
        title: 'id',
        name: 'id',
        formItem: {
            type: 'hidden'
        }
    }, {
        title: 'supMemberId',
        name: 'supMemberId',
        formItem: {
            type: 'hidden'
        }
    },{
        title: 'purMemberId',
        name: 'purMemberId',
        formItem: {
            type: 'hidden'
        }
    },
    {
        title: '订单状态',
        name: 'orderState',
        tableItem:{},
        dict: [
            {code: 0, codeName: '待签约'},
            {code: 1, codeName: '待付款'},
            {code: 2, codeName: '待结算'},
            {code: 3, codeName: '待评价'},
            {code: 4, codeName: '已完成'},
            {code: 5, codeName: '已失效'},
            {code: 6, codeName: '交易关闭'},
            {code: 7, codeName: '自动结算'},
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
        title: '订单编号',
        name: 'orderid',
        disabled:true,
        tableItem: {},
        formItem: {},
        searchItem: {
            group: 'abc'
        }
    },{
        title: '',
        name: 'beginTime',
        searchItem: {
            type: 'date',
            group: 'abc',
            placeholder: '开始时间'
        }
    },{
        title: '',
        name: 'endTime',
        searchItem: {
            type: 'date',
            group: 'abc',
            placeholder: '结束时间'
        }
    }, {
        title: '订单时间',
        name: 'orderTime',
        disabled:true,
        tableItem: {},
        formItem: {
            type: 'datetime',
        },
    },
    {
        title: '供应单位',
        name: 'supEnt',
        searchItem: {
            group: 'abc'
        }
    },{
        title: '供应单位',
        name: 'supEntId',
        dict:ents,
        formItem: {
            rules: [{required: true, message: '企业名称不能为空！'}],
            type:'select',
            showSearch:true,
            optionFilterProp:'children',
        }
    }, {
        title: '供应单位签约',
        name: 'supSignFlag',
        tableItem: {},
        dict: [
            {code: 0, codeName: '未签约'},
            {code: 1, codeName: '已签约'},
        ],
        formItem: {
            type: 'select',
        },
    },
    {
        title: '液源厂',
        name: 'supFactory',
        formItem: {
        }
    },{
        title: '液源单位',
        name: 'entFromId',
        dict:ents,
        formItem: {
            rules: [{required: true, message: '企业名称不能为空！'}],
            type:'select',
            showSearch:true,
            optionFilterProp:'children',
        }
    },
    {
        title: '采购单位',
        name: 'purEnt',
        tableItem: {},
        searchItem: {
            group: 'abc'
        }
    },{
        title: '采购单位',
        name: 'purEntId',
        dict:ents,
        formItem: {
            rules: [{required: true, message: '企业名称不能为空！'}],
            type:'select',
            showSearch:true,
            optionFilterProp:'children',
        }
    }, {
        title: '采购单位签约',
        name: 'purSignFlag',
        tableItem: {},
        dict: [
            {code: 0, codeName: '未签约'},
            {code: 1, codeName: '已签约'},
        ],
        formItem: {
            type: 'select',
        },
    },
    {
        title: '采购数量',
        name: 'purNum',
        formItem: {
            rules: [{required: true},{message:'只能输入数字',pattern: /^[0-9]+$/}]
        }
    },{
        title: '采购单价',
        name: 'purPrice',
        formItem: {
            rules: [{required: true},{message:'只能输入数字',pattern: /^[0-9]+$/}]
        }
    },{
        title: '装车时间',
        name: 'supDate',
        formItem: {
            type: 'datetime',
        }
    },{
        title: '卸货地址',
        name: 'purAddress',
        formItem: {

        }
    },{
        title: '卸货单位',
        name: 'entToId',
        dict:ents,
        formItem: {
            rules: [{required: true, message: '企业名称不能为空！'}],
            type:'select',
            showSearch:true,
            optionFilterProp:'children',
        }
    },{
        title: '卸货时间',
        name: 'purDate',
        formItem: {
            type: 'datetime',
        }
    }, {
        title: '是否匹配系统单位',
        name: 'isFormat',
        tableItem: {},
        dict: [
            {code: 0, codeName: '否'},
            {code: 1, codeName: '是'},
        ],
    },{
        title: '操作',
        tableItem: {
            width: 180,
            render: (text, record) => (
                <DataTable.Oper>
                    <Button tooltip="编辑" onClick={e => self.onUpdate(record)}>
                        <Icon type="edit"/>
                    </Button>
                    {/*<Button tooltip="删除" onClick={e => self.onDelete(record)}>*/}
                    {/*    <Icon type="trash"/>*/}
                    {/*</Button>*/}
                    <Button tooltip="查看合同" onClick={e => self.onSetting(record)}>
                        <Icon type="lines"/>
                    </Button>
                </DataTable.Oper>
            )
        }
    }
];
