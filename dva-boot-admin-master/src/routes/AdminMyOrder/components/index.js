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

@connect(({adminMyOrder, loading}) => ({
    adminMyOrder,
    loading: loading.models.adminMyOrder
}))
export default class extends BaseComponent {
    state = {
        record: null,
        visible: false,
        rows: [],
        set: false,
    };

    onCancel = () => {
        this.setState({
            record: null,
            visible: false,
            set: false,
        });
    };
    onSetting = record => {
        const orderid = record.orderid
        this.props.dispatch({
            type: 'adminMyOrder/viewContract',
            payload: {
                orderid:orderid,
                memberId:"",
            }
        });
    };
    render() {
        const {adminMyOrder, loading, dispatch} = this.props;
        const {pageData} = adminMyOrder;
        const columns = createColumns(this);
        const {rows, record, visible} = this.state;

        const searchBarProps = {
            columns,
            onSearch: values => {
                dispatch({
                    type: 'adminMyOrder/getPageInfo',
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
            // selectType: 'checkbox',
            showNum: true,
            isScroll: true,
            // selectedRowKeys: rows.map(item => item.rowKey),
            onChange: ({pageNum, pageSize}) => {
                dispatch({
                    type: 'adminMyOrder/getPageInfo',
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
            }
        };

        return (
            <Layout className="full-layout crud-page">
                <Header>
                    <Toolbar
                        appendLeft={
                            <Button.Group>
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
