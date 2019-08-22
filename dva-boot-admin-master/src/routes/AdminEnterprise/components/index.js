import React from 'react';
import {connect} from 'dva';
import {Layout, Button, Modal, Col, Input, Icon} from 'antd';
import BaseComponent from 'components/BaseComponent';
import Toolbar from 'components/Toolbar';
import SearchBar from 'components/SearchBar';
import DataTable from 'components/DataTable';
import Form from 'components/Form';
import {ModalForm} from 'components/Modal';
import {createColumns, columns2, columns3} from './columns';
import './index.less';

const {Content, Header, Footer} = Layout;
const Pagination = DataTable.Pagination;

@connect(({adminEnterprise, loading}) => ({
    adminEnterprise,
    loading: loading.models.adminEnterprise
}))
export default class extends BaseComponent {
    state = {
        record: null,
        visible: false,
        rows: [],
        set: false,
        set2: false,
        detailInfo: [],
        detailInfo2: []
    };

    handleDelete = records => {
        const {rows} = this.state;

        this.props.dispatch({
            type: 'adminEnterprise/remove',
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
    getSubCities = (values, form) => {
        form.setFieldsValue({'entCity': ''});
        form.setFieldsValue({'entCounty': ''});
        this.props.dispatch({
            type: 'adminEnterprise/getCities',
            payload: {
                pid: values,
            }
        });
    };
    getSubCountries = (values, form) => {
        form.setFieldsValue({'entCounty': ''});
        this.props.dispatch({
            type: 'adminEnterprise/getCountries',
            payload: {
                pid: values,
            }
        });
    };
    onSetting = record => {
        this.props.dispatch({
            type: 'adminEnterprise/getData',
            payload: {
                record,
                success: () => {
                    const data = this.props.adminEnterprise.enterpriseCertificate.data;
                    const content = this.props.adminEnterprise.enterpriseCertificate.message;
                    if (data.entId.length === 0) {
                        // Modal.confirm({
                        //     title: '提示',
                        //     content,
                        //     okButtonProps: {hidden: true},
                        //     onCancel() {
                        //     }
                        // });
                        this.setState({
                            set: !this.state.set,
                            detailInfo: [],
                        });
                    } else {
                        this.setState({
                            set: !this.state.set,
                            detailInfo: this.props.adminEnterprise.enterpriseCertificate.data,
                        });
                    }

                }
            }
        });
    };
    onSetting2 = record => {
        this.setState({
            set2: !this.state.set2,
            detailInfo2: {"entId":record.id,},
        });
    };
    onSetting3 = record => {
        this.props.dispatch({
            type: 'adminEnterprise/getGasReport',
            payload: {
                entId : record.id,
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
    onCancel2 = () => {
        this.setState({
            record: null,
            visible: false,
            set2: false,
            detailInfo2: []
        });
    };
    handleCancel = () => this.setState({previewVisible: false}
    );

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    handleSubmit = (value, record) => {
        this.props.dispatch({
            type: 'adminEnterprise/approve',
            payload: {
                record: value,
                success: () => {
                    this.onCancel();
                }
            }
        });
    };
    handleSubmit2 = (value, record) => {
        this.props.dispatch({
            type: 'adminEnterprise/saveGasReport',
            payload: {
                record: value,
                success: () => {
                    this.onCancel2();
                }
            }
        });
    };

    render() {
        const {adminEnterprise, loading, dispatch} = this.props;
        const {pageData, provinces, cities, countries} = adminEnterprise;
        const columns = createColumns(this, provinces, cities, countries);
        const {rows, record, visible} = this.state;
        const searchBarProps = {
            columns,
            onSearch: values => {
                dispatch({
                    type: 'adminEnterprise/getPageInfo',
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
                    type: 'adminEnterprise/getPageInfo',
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
                    type: 'adminEnterprise/save',
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
                        handleChange={this.handleChange}
                    >
                    </Form>
                </Modal>
                <Modal
                    title="气质报告"
                    visible={this.state.set2}
                    destroyOnClose={true}
                    onCancel={this.onCancel2}
                    width={550}
                    footer={false}
                >
                    <Form
                        record={this.state.detailInfo2}
                        columns={columns3}
                        onSubmit={this.handleSubmit2}
                        onCancel={this.onCancel2}
                        isHiddenReset={true}
                    >
                    </Form>
                </Modal>
            </Layout>
        );
    }
}
