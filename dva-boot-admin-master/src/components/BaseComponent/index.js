import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import $$ from 'cmn-utils';
import config from '@/config';

class BaseComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      set: false,
    };
  }
  /**
   * 在没有dispatch函数时，如果想要在组件内进行跳转可以用router进行跳转
   */
  static contextTypes = {
    router: PropTypes.object
  };

  notice = config.notice; // 消息通知

  /**
   * history api 路由跳转
   */
  get history() { 
    return this.context.router.history;
  }

  /**
   * 新增
   */
  onAdd = () => {
    this.setState({
      record: null,
      visible: true
    });
  };

  /**
   * 修改
   * @param {object} 表单记录
   */
  onUpdate = record => {
    this.setState({
      record,
      visible: !this.state.set,
    });
  };

  /**
   * 删除
   * @param {object | array} 表单记录, 批量删除时为数组
   */
  onDelete = record => {
    if (!record) return;
    if ($$.isArray(record) && !record.length) return;

    const content = `您是否要删除这${
      $$.isArray(record) ? record.length : ''
    }项？`;

    Modal.confirm({
      title: '注意',
      content,
      onOk: () => {
        this.handleDelete($$.isArray(record) ? record : [record]);
      },
      onCancel() {}
    });
  };
  onSend = record => {
    if (!record) return;
    if ($$.isArray(record) && !record.length) return;

    const content = `您是否要推送这${
        $$.isArray(record) ? record.length : ''
        }项？`;

    Modal.confirm({
      title: '注意',
      content,
      onOk: () => {
        this.handleSend($$.isArray(record) ? record : [record]);
      },
      onCancel() {}
    });
  };

  /**
   * 设置
   */
  // onSetting = record => {
  //   this.setState({
  //     record,
  //     set: !this.state.set,
  //   });
  // };
  handleAdd() {
    /* 子类重写 */
  }
  handleUpdate() {
    /* 子类重写 */
  }
  handleDelete(records) {
    /* 子类重写 */
  }
}

export default BaseComponent;
