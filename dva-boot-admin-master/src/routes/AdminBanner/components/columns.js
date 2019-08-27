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
        title: 'Banner位置',
        name: 'type',
        dict: [
            {code: 0, codeName: '首页'},
            {code: 1, codeName: '咨询'},
            {code: 2, codeName: '贸易'},
        ],
        tableItem: {width: 180},
        formItem: {
            type: 'select',
        },
    }, {
        title: '创建时间',
        name: 'timei',
        tableItem: {},
    },{
        title: 'Banner图',
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
            listType:"picture",
            maxFileSize: 1000, // 最大限制 kb
            fileTypes: ['.png', '.jpg', '.gif'], // 允许类型
            max: 1,//上传图片数量最大限制
            // action: 'http://localhost:3000/article-gate/business/file/upload?fileType=image&subType=banner'
            action: 'http://s.lng168.com/article-gate/business/file/upload?fileType=image&subType=banner'
        },
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
                    <Button tooltip="查看大图" onClick={e => self.onSetting(record)}>
                        <Icon type="lines"/>
                    </Button>
                </DataTable.Oper>
            )
        }
    }
];