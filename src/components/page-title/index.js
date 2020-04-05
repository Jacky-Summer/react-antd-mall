import React, { Component } from 'react';
import { Row, Col } from 'antd'
import './index.less'

class PageTitle extends Component {

    componentDidMount () {
        
    }

    render() {
        return (
            <Row>
                <Col span="12">
                    <h1 className="page-header">{this.props.title ? this.props.title : '首页'}</h1>
                </Col>
                <Col span="12" style={{ textAlign: 'right' }}>
                    {this.props.children}
                </Col>
            </Row>
        );
    }
}

export default PageTitle;