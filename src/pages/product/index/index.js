import React, { Component } from 'react';
import PageTitle from '@components/page-title'
import { Row, Col, Select, Input, Button, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import Product from '@service/product-service.js'
import Utils from '@src/utils'
import './index.less'
const { Column } = Table;
const { Option } = Select;
const _product = new Product()
const _util = new Utils()

class ProductList extends Component {

    loadProductList () {
        _product.getProductList().then(res => {
            console.log(res)
        }, errMsg =>{
            _util.errorTips(errMsg)
        })
    }

    componentDidMount () {
        this.loadProductList()
    }

    render() {
        const dataSource = [
            
        ]

        const columns = [
            {
                title: '商品ID',
                dataIndex: 'name',
                key: 'name',
            },
        ]

        return (
            <div className="container">
                <PageTitle title="商品列表"/>
                <div className="content">
                    <Row>
                        <Col span="14">
                            <Select defaultValue="productId" className="select-options">
                                <Option value="productId">按商品ID查询</Option>
                                <Option value="productName">按商品名称查询</Option>
                            </Select> 
                            <Input placeholder="关键词" className="input-keyword"/>
                            <Button type="primary" className="btn-add">查询</Button>
                        </Col>
                        <Col span="10" className="add-container">
                            <Button type="primary"><PlusOutlined />添加商品</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Table dataSource={[]} className="table-list" bordered>
                            <Column title="Age" dataIndex="age" key="age" />
                            <Column title="Address" dataIndex="address" key="address" />
                            <Column
                                title="Action"
                                key="action"
                                render={(text, record) => (
                                    <span>
                                    <a style={{ marginRight: 16 }}>Invite {record.lastName}</a>
                                    <a>Delete</a>
                                    </span>
                                )}
                            />
                        </Table>
                    </Row>
                </div>
            </div>
        );
    }
}

export default ProductList;