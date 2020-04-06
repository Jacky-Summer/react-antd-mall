import React, { Component } from 'react';
import { Row, Col } from 'antd'
import User from '@service/user-service.js'
import Utils from '@src/utils'
import { withRouter } from 'react-router-dom'
import './index.less'
import { LoginOutlined } from '@ant-design/icons';
const _util = new Utils()
const _user = new User()

class Header extends Component {
    
    logout = () => {
        _user.logout().then(res => {
            _util.removeStorage('userInfo');
            _util.successTips('成功退出登录！')
            this.props.history.push('/login')
        })
    }

    render() {
        return (
            <div className="header">
                <Row>
                    <Col span="24" className="header-top">
                        <span>欢迎你, admin</span>
                    </Col>
                    <div className="logout">
                        <LoginOutlined className="logout-icon"/>
                        <span onClick={this.logout}>退出登录</span>
                    </div>
                </Row>
            </div>
        );
    }
}

export default withRouter(Header);