import React, { Component } from 'react';
import PageTitle from '@components/page-title'
import { Row, Col, Table } from 'antd'
import Order from '@service/order-service.js'
import './detail.less'

const _order = new Order()

class OrderDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            orderNumber: this.props.match.params.orderNumber,
            orderInfo: {}
        }
    }

    componentDidMount () {
        _order.getOrderDetail(this.state.orderNumber).then(res => {
            console.log(res)
            this.setState({
                orderInfo: res
            })
        })
    }

    render() {
        const dataSource = this.state.orderInfo.orderItemVoList
          
        const columns = [
            {
              title: '商品图片',
              width: 140,
              dataIndex: 'productImage',
              key: 'productImage',
              render: (text) => {
                return (
                    <img src={`${this.state.orderInfo.imageHost}${text}`} className="product-img" alt=""/>
                )
              }
            },
            {
              title: '商品信息',
              dataIndex: 'productName',
              key: 'productName',
            },
            {
              title: '单价',
              dataIndex: 'currentUnitPrice',
              key: 'currentUnitPrice',
            },
            {
                title: '数量',
                dataIndex: 'quantity',
                key: 'quantity',
            },
            {
                title: '合计',
                dataIndex: 'totalPrice',
                key: 'totalPrice',
            },
        ];

        return (
            <div className="container">
                <PageTitle title="订单详情"/>
                <div className="content">
                    <Row className="form-control">
                        <Col span={3} offset={1} className="info-tag">订单号</Col>
                        <Col span={18}>{this.state.orderInfo.orderNo}</Col>
                    </Row>
                    <Row className="form-control">
                        <Col span={3} offset={1} className="info-tag">创建时间</Col>
                        <Col span={18}>{this.state.orderInfo.createTime}</Col>
                    </Row>
                    <Row className="form-control">
                        <Col span={3} offset={1} className="info-tag">收件人</Col>
                        <Col span={18}>{this.state.orderInfo.receiverName}</Col>
                    </Row>
                    <Row className="form-control">
                        <Col span={3} offset={1} className="info-tag">订单状态</Col>
                        <Col span={18}>{this.state.orderInfo.statusDesc}</Col>
                    </Row>
                    <Row className="form-control">
                        <Col span={3} offset={1} className="info-tag">支付方式</Col>
                        <Col span={18}>{this.state.orderInfo.paymentTypeDesc}</Col>
                    </Row>
                    <Row className="form-control">
                        <Col span={3} offset={1} className="info-tag">订单金额</Col>
                        <Col span={18}>￥ {this.state.orderInfo.payment}</Col>
                    </Row>
                    <Row className="form-control">
                        <Col span={3} offset={1} className="info-tag">商品列表</Col>
                        <Col span={18}>
                            <Table 
                                dataSource={dataSource} 
                                columns={columns} 
                                pagination={false}
                                rowKey={ record => record.orderNo }
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default OrderDetail;