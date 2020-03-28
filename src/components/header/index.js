import React, { Component } from 'react';
import { Row, Col } from 'antd'
import './index.less'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <Row>
                    <Col span="24" className="header-top">
                        <span>欢迎你, admin</span>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Header;