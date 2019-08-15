import React from 'react';
import {connect} from 'dva';
import {Layout, Button, Modal, Col, Input, Icon} from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import Form from 'components/Form';
import {ModalForm} from 'components/Modal';
import {createColumns, columns2} from './columns';
import './index.less';
import ExportJsonExcel from "js-export-excel";
import $$ from "cmn-utils/lib";

const {Content, Header, Footer} = Layout;
const Pagination = DataTable.Pagination;

@connect(({adminMember, loading}) => ({
    adminMember,
    loading: loading.models.adminMember
}))
export default class extends BaseComponent {
    state = {
        record: null,
        visible: false,
        rows: [],
        set: false,
        detailInfo: []
    };

    handleDelete = records => {
        const {rows} = this.state;
alert(JSON.stringify(records));
        this.props.dispatch({
            type: 'adminMember/remove',
            payload: {
                records,
                success: () => {
                    // 如果操作成功，在已选择的行中，排除删除的行
                    this.setState({
                        rows: rows.filter(
                            item => !records.some(jtem => jtem.rowKey === item.rowKey)
                        )
                    });
                }
            }
        });
    };
    onSetting = record => {
        this.props.dispatch({
            type: 'adminMember/getData',
            payload: {
                record,
                success: () => {
                    const data = this.props.adminMember.memberCertificate.data;
                    const content = this.props.adminMember.memberCertificate.message;
                    if (data.membeId.length === 0) {
                        Modal.confirm({
                            title: '提示',
                            content,
                            okButtonProps: {hidden: true},
                            onCancel() {
                            }
                        });
                    } else {
                        this.setState({
                            set: !this.state.set,
                            detailInfo: this.props.adminMember.memberCertificate.data,
                        });
                    }
                }
            }
        });
    };
    onCancel = () => {
        this.setState({
            record: null,
            visible: false,
            set: false,
            detailInfo: []
        });
    };

    handleSubmit = (value, record) => {
        this.props.dispatch({
            type: 'adminMember/approve',
            payload: {
                record: value,
                success: () => {
                    this.onCancel();
                }
            }
        });
    };
    handleExport = records => {
        // this.props.dispatch({
        //     type: 'adminMember/getMemberList',
        //     payload: {
        //         records,
        //         success: () => {
        //             this.downloadExcel();
        //         }
        //     }
        // });
        return $$.get('/adminMember/getMemberExport')
            // .then(resp => {
            //     alert(response );
            // })
            .then(response => response.blob())
            .then(blob => {
                alert(1);
                var url = window.URL.createObjectURL(blob);
                var a = document.createElement('a');
                a.href = url;
                a.download = "翼贸通会员明细统计表.xls";
                a.click();
            })
            .catch(e => console.error(e));
    };
    // 调用方法
    downloadExcel = () => {
        const {adminMember} = this.props;
        const {memberLists} = adminMember;
        console.log(JSON.stringify(memberLists))
        var option = {};
        let dataTable = [];
        if (memberLists) {
            for (let i in memberLists.data) {
                console.log(JSON.stringify(memberLists.data))
                if (memberLists.data) {
                    let obj = {
                        '用户名': memberLists.data[i].ename,
                        '手机': memberLists.data[i].mobile,
                        '昵称': memberLists.data[i].nickname,
                        '创建时间': memberLists.data[i].timei,
                        '截止时间': memberLists.data[i].closingDate,
                        '最后一次在线时间': memberLists.data[i].appLastOnlineTime,
                        '推荐号': memberLists.data[i].referralCode,
                        '会员级别': memberLists.data[i].memberLevel,
                        '认证状态': memberLists.data[i].cerStatus,
                        '用户类别': memberLists.data[i].type==0?"模拟用户":"真实用户",
                    }
                    dataTable.push(obj);
                }
            }
        }
        option.fileName = '会员统计表'
        option.datas = [
            {
                sheetData: dataTable,
                sheetName: '会员统计表',
                sheetFilter: ['用户名', '手机', '昵称', '创建时间', '截止时间', '最后一次在线时间', '推荐号', '会员级别', '认证状态', '用户类别'],
                sheetHeader: ['用户名', '手机', '昵称', '创建时间', '截止时间', '最后一次在线时间', '推荐号', '会员级别', '认证状态', '用户类别'],
            }
        ];

        var toExcel = new ExportJsonExcel(option); //new
        toExcel.saveExcel();
    }


    render() {
        const {adminMember, loading, dispatch} = this.props;
        const {pageData} = adminMember;
        const columns = createColumns(this);
        const {rows, record, visible} = this.state;
        const searchBarProps = {
            columns,
            onSearch: values => {
                dispatch({
                    type: 'adminMember/getPageInfo',
                    payload: {
                        pageData: pageData.filter(values).jumpPage(1, 10)
                    }
                });
            }
        };
        const dataTableProps = {
            loading,
            columns,
            rowKey: 'id',
            dataItems: pageData,
            selectType: 'checkbox',
            showNum: true,
            isScroll: true,
            selectedRowKeys: rows.map(item => item.rowKey),
            onChange: ({pageNum, pageSize}) => {
                dispatch({
                    type: 'adminMember/getPageInfo',
                    payload: {
                        pageData: pageData.jumpPage(pageNum, pageSize)
                    }
                });
            },
            onSelect: (keys, rows) => this.setState({rows})
        };

        const modalFormProps = {
            loading,
            record,
            visible,
            columns,
            modalOpts: {
                width: 700
            },
            onCancel: () => {
                this.setState({
                    record: null,
                    visible: false
                });
            },
            // 新增、修改都会进到这个方法中，
            // 可以使用主键或是否有record来区分状态
            onSubmit: values => {
                dispatch({
                    type: 'adminMember/save',
                    payload: {
                        values,
                        record,
                        success: () => {
                this.setState({
                    record: null,
                    visible: false
                });
                        }
                    }
                });
            }
        };

        return (
            <Layout className="full-layout crud-page">
                <Header>
                    <Toolbar
                        appendLeft={
                            <Button.Group>
                                <Button type="primary" icon="plus" onClick={this.onAdd}>
                                    新增
                                </Button>
                                <Button
                                    disabled={!rows.length}
                                    onClick={e => this.onDelete(rows)}
                                    icon="delete"
                                >
                                    删除
                                </Button>
                                <Button
                                    onClick={e => this.handleExport(rows)}
                                    icon="download"
                                >
                                    一键导出列表
                                </Button>
                            </Button.Group>
                        }
                        pullDown={<SearchBar type="grid" {...searchBarProps} />}
                    >
                        <SearchBar group="abc" {...searchBarProps} />
                    </Toolbar>
                </Header>
                <Content>
                    <DataTable {...dataTableProps} />
                </Content>
                <Footer>
                    <Pagination {...dataTableProps} />
                </Footer>
                <ModalForm {...modalFormProps} />
                <Modal
                    title="认证信息"
                    visible={this.state.set}
                    destroyOnClose={true}
                    onCancel={this.onCancel}
                    width={550}
                    footer={false}
                >
                    <Form
                        record={this.state.detailInfo}
                        columns={columns2}
                        onSubmit={this.handleSubmit}
                        onCancel={this.onCancel}
                        isHiddenReset={true}
                    >
                    </Form>
                </Modal>
            </Layout>
        );
    }
}
