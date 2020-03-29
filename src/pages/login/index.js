import React, { Component } from 'react';
import { Form, Input, Button, Card, Row } from 'antd';
import User from '@service/user-service.js'
import Utils from '@src/utils'
import './index.less'

const _util = new Utils()
const _user = new User()

class Login extends Component {

    UNSAFE_componentWillMount () {
        document.title = '登录 - ADMIN MMALL';
    }

    submitForm = loginInfo => {
        const formData = new FormData(); // 以FormData形式提交数据
        formData.append('username', loginInfo.username)
        formData.append('password', loginInfo.password)
        _user.login(loginInfo).then(res => {
            _util.setStorage('userInfo', res)
            this.props.history.push('/home')
        }, errMsg => {
            _util.errorTips(errMsg)
        })
    }
    
    render() {

        const layout = {
            labelCol: {
              span: 4,
            },
            wrapperCol: {
              span: 20,
            },
        };
        const tailLayout = {
            wrapperCol: {
              span: 24
            },
        };
          

        return (
            <div className="login-wrap">
                <Card>
                    <h1 className="title">欢迎登录MALL ADMIN</h1>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={this.submitForm}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入你的用户名',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入你的密码',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit" className="btn-submit">
                                登录
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Login;