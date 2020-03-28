import React, { Component } from 'react';
import { Row, Col } from 'antd'
import NavLeft from '../nav-left'
import Header from '../header'
import Footer from '../footer'
import '../../style/reset.less'
import '../../style/common.less'

class Layout extends Component {
    render() {
        return (
            <Row className="wrapper">
                <Col span="4" className="nav-left">
                    <NavLeft/>
                </Col>
                <Col span="20" className="main">
                    <Header/>
                    <Row className="content-wrapper">
                        {this.props.children}
                    </Row>
                    <Footer/>
                </Col>
            </Row>
        );
    }
}

export default Layout;