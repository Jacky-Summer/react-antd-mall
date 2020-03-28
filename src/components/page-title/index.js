import React, { Component } from 'react';
import { Row, Col } from 'antd'
import './index.less'

class PageTitle extends Component {

    componentDidMount () {
        
    }

    render() {
        return (
            <Row>
                <Col span="24">
                    <h1 className="page-header">{this.props.title ? this.props.title : '首页'}</h1>
                </Col>
            </Row>
        );
    }
}

export default PageTitle;