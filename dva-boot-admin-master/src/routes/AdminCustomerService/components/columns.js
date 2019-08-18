import React from 'react';
import DataTable from 'components/DataTable';
import Icon from 'components/Icon';
import Button from 'components/Button';

export const createColumns = (self) => [
    {
        title: '会员id',
        name: 'infoId',
        formItem: {
            type: 'hidden'
        }
    }, {
        title: '客服状态',
        name: 'work_state',
        dict: [
            {code: 1, codeName: '闲置'},
            {code: 0, codeName: '忙碌'}
        ],
        tableItem: {},
        formItem: {
            type: 'select',
        }
    }, {
        title: '客服昵称',
        name: 'nickname',
        tableItem: {},
        disabled:true,
        formItem: {},
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '手机号',
        name: 'mobile',
        disabled:true,
        tableItem: {},
        formItem: {},
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
                    <Button tooltip="设置" onClick={e => self.onUpdate(record)}>
                        <Icon type="gear"/>
                    </Button>
                </DataTable.Oper>
            )
        }
    }
];