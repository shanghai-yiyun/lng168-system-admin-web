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
    },{
        title: '订单编号',
        name: 'orderid',
        disabled:true,
        tableItem: {},
        formItem: {},
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '订单时间',
        name: 'orderTime',
        disabled:true,
        tableItem: {},
        formItem: {},
    },
    {
        title: '供应单位',
        disabled:true,
        name: 'supEnt',
        tableItem: {},
        formItem: {

        }
    },
    {
        title: '液源厂',
        name: 'supFactory',
        disabled:true,
        formItem: {

        }
    },
    {
        title: '采购单位',
        name: 'purEnt',
        disabled:true,
        tableItem: {},
        formItem: {

        }
    },
    {
        title: '采购数量',
        name: 'purNum',
        disabled:true,
        formItem: {

        }
    },{
        title: '采购单价',
        name: 'purPrice',
        disabled:true,
        formItem: {

        }
    },{
        title: '装车时间',
        disabled:true,
        name: 'supDate',
        formItem: {

        }
    },{
        title: '卸货地址',
        disabled:true,
        name: 'purAddress',
        formItem: {

        }
    },{
        title: '卸货时间',
        disabled:true,
        name: 'purDate',
        formItem: {

        }
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
                </DataTable.Oper>
            )
        }
    }
];
