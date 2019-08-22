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
        title: '模板编号',
        name: 'templateId',
        tableItem: {width: 180},
        formItem: {},
        searchItem: {
            group: 'abc'
        }
    }, {
        title: '参数',
        name: 'parameter',
        tableItem: {width: 180},
        formItem: {
            type:'textarea',
            rules: [{required: true, message: '参数不能为空！'}],
            style:{width:200}
        },
    }, {
        title: '创建时间',
        name: 'timei',
        tableItem: {},
    },{
        title: '模板上传',
        name: 'fileList',
        formItem: {
            type: 'upload',
            initialValue: [],
            rules: [
                {
                    required: true,
                    message: '请选择模板'
                }
            ],
            maxFileSize: 1000, // 最大限制 kb
            fileTypes: ['.pdf'], // 允许类型
            max: 1,//上传图片数量最大限制
            action:'http://s.lng168.com/article-gate/business/file/uploadTwo'
            // action:'http://localhost:3000/article-gate/business/file/uploadTwo'
        },
    },
    {
        title: '操作',
        tableItem: {
            width: 180,
            render: (text, record) => (
                <DataTable.Oper>
                    <Button tooltip="查看模板" onClick={e => self.onSetting(record)}>
                        <Icon type="lines"/>
                    </Button>
                    {/*<Button tooltip="编辑" onClick={e => self.onUpdate(record)}>*/}
                    {/*    <Icon type="edit"/>*/}
                    {/*</Button>*/}
                    <Button tooltip="删除" onClick={e => self.onDelete(record)}>
                        <Icon type="trash"/>
                    </Button>
                </DataTable.Oper>
            )
        }
    }
];