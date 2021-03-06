import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Form, Layout, Button, Icon, Input, Checkbox, Spin } from 'antd';
import logoImg from 'assets/images/logo1.png';
import './index.less';
const { Content } = Layout;
const FormItem = Form.Item;

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login
}))
class Login extends Component {
  handleSubmit = e => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/login',
          payload: values
        });
      }
    });
  };
  sendSMS = e => {
    const { form, dispatch } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'login/checkSMS',
          payload: values
        });
      }
    });
  };

  render() {
    const { loading, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Layout className="full-layout login-page">
        <Content>
          <Spin tip="登录中..." spinning={!!loading}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="user-img">
                <img src={logoImg} alt="logo" />
                <b>翼贸通管理后台</b>
              </div>
              <FormItem>
                {getFieldDecorator('userName', {
                  initialValue: 'admin',
                  rules: [{ required: true, message: '请输入您的手机号码' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" />}
                    placeholder="手机号码"
                  />
                )}
                <Button
                    size="large"
                    type="primary"
                    onClick={this.sendSMS}
                >
                  获取验证码
                </Button>
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  initialValue: 'admin',
                  rules: [{ required: true, message: '请输入您的密码' }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" />}
                    type="password"
                    placeholder="短信验证码"
                  />
                )}

              </FormItem>
              <FormItem>
                {/*<Link className="login-form-forgot" to="#">*/}
                {/*  忘记密码*/}
                {/*</Link>*/}
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
                {/*<div className="new-user">*/}
                {/*  <Link to="/sign/register">现在注册</Link>*/}
                {/*</div>*/}
                <div className="new-user">
                  <Link to="/sign/Login">用户名登录</Link>
                </div>
              </FormItem>
            </Form>
          </Spin>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Login);
