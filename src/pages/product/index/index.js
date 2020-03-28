import React, { Component } from 'react';
import PageTitle from '@components/page-title'
import { Row } from 'antd'

class Product extends Component {
    render() {
        return (
            <div className="container">
                <PageTitle title="商品列表"/>
                <Row className="content">
                    
                </Row>
            </div>
        );
    }
}

export default Product;