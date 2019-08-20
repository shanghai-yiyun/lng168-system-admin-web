import React from 'react';
import {connect} from 'dva';
import {Layout, Button, Modal} from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import {ModalForm} from 'components/Modal';
import Form from 'components/Form';
import {createColumns,createColumns2} from './columns';
import PageHelper from '@/utils/pageHelper';
import './index.less';
import $$ from "cmn-utils/lib";

const {Content, Header, Footer} = Layout;
const Pagination = DataTable.Pagination;

@connect(({adminBusPur, loading}) => ({
    adminBusPur,
    loading: loading.models.adminBusPur
}))
export default class extends BaseComponent {
    state = {
        record: null,
        visible: false,
        rows: [],
        set: false,
        entType:""
    };

    handleDelete = records => {
        const {rows} = this.state;

        this.props.dispatch({
            type: 'adminBusPur/remove',
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

    onCancel = () => {
        this.setState({
            record: null,
            visible: false,
            set: false,
        });
    };
    handleChange = (targetKeys, targetNodes) => {
        this.setState({targetNodes: targetNodes});
    }
    handleSubmit = (value)=> {
        this.props.dispatch({
            type: 'adminBusPur/sendMessage',
            payload: {
                record: this.state.record,
                value: value,
                success: () => {
                    this.onCancel();
                }
            }
        });
    };
    onLoadTableData = pageInfo => {
        return $$.post('/adminMember/getList', PageHelper.requestFormat(pageInfo))
            .then(resp => {
                return PageHelper.responseFormat(resp);
            })
            .catch(e => console.error(e));
    };
    onLoadTableData2 = (value) => {
        this.setState({
            entType:value
        });
    };
    // onLoadSupplyOfferData = pageInfo => {
    //     const id = this.state.record.id;
    //     const type = this.state.record.type;
    //     pageInfo.filter({"id":id,"type":type});
    //     return $$.post('/adminBusPur/getSupplyOfferList', PageHelper.requestFormat(pageInfo))
    //         .then(resp => {
    //             return PageHelper.responseFormat(resp);
    //         })
    //         .catch(e => console.error(e));
    // };
    // onLoadPurchOfferData= pageInfo => {
    //     const id = this.state.record.id;
    //     const type = this.state.record.type;
    //     pageInfo.filter({"id":id,"type":type});
    //     return $$.post('/adminMember/getPurchOfferList', PageHelper.requestFormat(pageInfo))
    //         .then(resp => {
    //             return PageHelper.responseFormat(resp);
    //         })
    //         .catch(e => console.error(e));
    // };
    /**
     * 意向咨询
     * @param {object} 表单记录
     */
    onRecommended = record => {
        this.setState({
            record:record,
            set: !this.state.set,
        });
    };
    render() {
        const {adminBusPur, loading, dispatch} = this.props;
        const {pageData, memberTableData,ents,members} = adminBusPur;
        const columns = createColumns(this,memberTableData,ents,members);
        const {rows, record, visible} = this.state;
        const columns2 = createColumns2(this,memberTableData);
        const searchBarProps = {
            columns,
            onSearch: values => {
                dispatch({
                    type: 'adminBusPur/getPageInfo',
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
                    type: 'adminBusPur/getPageInfo',
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
                    visible: false,
                });
            },
            // 新增、修改都会进到这个方法中，
            // 可以使用主键或是否有record来区分状态
            onSubmit: values => {
                dispatch({
                    type: 'adminBusPur/save',
                    payload: {
                        values,
                        record,
                        success: () => {
                            this.setState({
                                record: null,
                                visible: false,
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
                <Modal
                    style={{width: '90%'}}
                    title="信息反馈"
                    visible={this.state.set}
                    onCancel={this.onCancel}
                    width={550}
                    footer ={false}
                    destroyOnClose
                >
                    <Form
                        columns={columns2}
                        onSubmit={this.handleSubmit}
                        onCancel={this.onCancel}
                    >
                    </Form>
                </Modal>
            </Layout>
        );
    }
}
