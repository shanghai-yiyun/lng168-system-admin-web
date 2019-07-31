import React from 'react';
import {connect} from 'dva';
import {Layout, Button, Modal} from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import DataTable from 'components/DataTable';
import {ModalForm} from 'components/Modal';
import TransferTree from 'components/TransferTree';
import {createColumns} from './columns';
import PageHelper from '@/utils/pageHelper';
import './index.less';
import $$ from "cmn-utils/lib";

const {Content, Header, Footer} = Layout;
const Pagination = DataTable.Pagination;

@connect(({adminBusiness, loading}) => ({
    adminBusiness,
    loading: loading.models.adminBusiness
}))
export default class extends BaseComponent {
    state = {
        record: null,
        visible: false,
        rows: [],
        set: false,
        targetNodes: [],
        menuRecord: null,
        loadingNodes: [],
    };

    handleDelete = records => {
        const {rows} = this.state;

        this.props.dispatch({
            type: 'adminBusiness/remove',
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
            type: 'adminBusiness/memberList',
            payload: {
                record,
                success: () => {
                    this.setState({
                        set: !this.state.set,
                        menuRecord: record,
                    });
                }
            }
        });
    };
    onMemberSelect = () => {
        const {dispatch} = this.props;
        const selectMember= this.state.targetNodes;
        const menuRecord = this.state.menuRecord;
        dispatch({
            type: 'adminBusiness/sendMessage',
            payload: {
                menuRecord,
                selectMember,
                success: () => {
                    this.setState({
                        set: !this.state.set,
                        targetNodes: [],
                        loadingNodes: [],
                    });
                }
            }
        });
    };
    onCancel = () => {
        this.setState({
            record: null,
            visible: false,
            set: false,
            targetNodes: [],
            loadingNodes: [],
        });
    };
    handleChange = (targetKeys, targetNodes) => {
        this.setState({targetNodes: targetNodes});
    }
    onLoadTableData = pageInfo => {
        return $$.post('/adminBusiness/memberList', PageHelper.requestFormat(pageInfo))
            .then(resp => {
                return PageHelper.responseFormat(resp);
            })
            .catch(e => console.error(e));
    };
    render() {
        const {adminBusiness, loading, dispatch} = this.props;
        const {pageData, rolesMenu, memberTableData} = adminBusiness;
        const columns = createColumns(this,memberTableData);
        const {rows, record, visible} = this.state;
        // this.state.loadingNodes = rolesSelectMenu.data;
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
                    type: 'adminBusiness/getPageInfo',
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
                    type: 'adminBusiness/save',
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
                    >
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
                    title="选择推送会员"
                    visible={this.state.set}
                    onOk={this.onMemberSelect}
                    onCancel={this.onCancel}
                    width={550}
                >
                    <div>
                        <Layout className="full-layout page transfer-tree-page">
                            <Content>
                                <TransferTree
                                    dataSource={rolesMenu}
                                    loading={loading}
                                    targetNodes={this.state.loadingNodes}
                                    onChange={this.handleChange}
                                    showSearch
                                />
                            </Content>
                        </Layout>
                    </div>
                </Modal>
            </Layout>
        );
    }
}
