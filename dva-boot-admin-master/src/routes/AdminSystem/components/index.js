import React from 'react';
import {connect} from 'dva';
import {Layout, Button, Modal, Col} from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import {ModalForm} from 'components/Modal';
import {createColumns} from './columns';
import './index.less';

const {Content, Header, Footer} = Layout;
const Pagination = DataTable.Pagination;

@connect(({adminSystem, loading}) => ({
    adminSystem,
    loading: loading.models.adminSystem
}))
export default class extends BaseComponent {
    state = {
        record: null,
        visible: false,
        rows: [],
        set: false,
        // detailInfo: []
    };

    handleDelete = records => {
        const {rows} = this.state;

        this.props.dispatch({
            type: 'adminSystem/remove',
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
    // onSetting = record => {
    //     this.props.dispatch({
    //         type: 'adminSystem/getData',
    //         payload: {
    //             record,
    //             success: () => {
    //                 // alert(JSON.stringify(this.props.memberCertificate));
    //                 const data =this.props.adminMember.memberCertificate.data;
    //                 const content =this.props.adminMember.memberCertificate.message;
    //                 if(data.length===0){
    //                     Modal.confirm({
    //                         title: '提示',
    //                         content,
    //                         okButtonProps:{hidden:true },
    //                         onCancel() {}
    //                     });
    //                 }else{
    //                     this.setState({
    //                         set: !this.state.set,
    //                         detailInfo : this.props.adminMember.memberCertificate.data,
    //                     });
    //                 }
    //             }
    //         }
    //     });
    // };
    onCancel = () => {
        this.setState({
            record: null,
            visible: false,
            set: false,
            // detailInfo:[]
        });
    };

    render() {
        const {adminSystem, loading, dispatch} = this.props;
        const {pageData} = adminSystem;
        const columns = createColumns(this);
        const {rows, record, visible} = this.state;

        const searchBarProps = {
            columns,
            onSearch: values => {
                dispatch({
                    type: 'adminSystem/getPageInfo',
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
                    type: 'adminSystem/getPageInfo',
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
                    type: 'adminSystem/save',
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
            </Layout>
        );
    }
}
