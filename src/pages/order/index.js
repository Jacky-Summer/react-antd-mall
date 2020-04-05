import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PageTitle from '@components/page-title'
import ListSearch from './index-list-search'
import { Row, Col, Button, Modal } from 'antd'
import Order from '@service/order-service.js'
import TableList from '@components/table-list'
import Utils from '@src/utils'

const _order = new Order()
const _util = new Utils()

class OrderList extends Component {

    constructor (props) {
        super(props)
        this.state = {
            pageNum: 1,
            total: 0,
            listType: 'list'
        }
    }

    loadOrderList () {   
        let listParam = {}
        listParam.listType = this.state.listType
        listParam.pageNum  = this.state.pageNum
        if (listParam.listType === 'search') {
            listParam.orderNo = this.state.orderNumber
        }
        _order.getOrderList(listParam).then(res => {
            this.setState(res)
        })
    }

    componentDidMount () {
        this.loadOrderList()
    }

    onSearch (orderNumber) {
        let listType = orderNumber === '' ? 'list': 'search'
        this.setState({
            listType: listType,
            pageNum: 1,
            orderNumber: orderNumber
        }, () => {
            this.loadOrderList()
        })
    }
    
    render() {

        const columns = [
            {
                title: '订单ID',
                dataIndex: 'orderNo',
                key: 'orderNo',
            },
            {
                title: '收件人',
                dataIndex: 'receiverName',
                key: 'receiverName',
            },
            {
                title: '订单状态',
                dataIndex: 'statusDesc',
                key: 'statusDesc',
            },
            {
                title: '订单总价',
                dataIndex: 'payment',
                key: 'payment',
                render: (text) => {
                    return `￥${text}`
                }
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime'
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <Link to={`/order/detail/${record.orderNo}`}>详情</Link>
                ),
            },
        ]

        const paginationProps = {
            current: this.state.pageNum,
            size: this.state.size,
            total: this.state.total,
            onChange: (page) => {
                this.state.pageNum = page
                this.loadOrderList()
            },
            showTotal: () => {
                return `共有 ${this.state.total} 条数据`
            },
            showQuickJumper: true
        }

        return (
            <div className="container">
                <PageTitle title="订单列表"/>
                <div className="content">
                    <ListSearch onSearch={(searchType, searchKeyword) => { this.onSearch(searchType, searchKeyword)}}/>
                    <Row>
                        <TableList 
                            list={this.state.list} 
                            columns={columns}
                            rowKey={ record => record.orderNo } 
                            paginationProps={paginationProps}
                        />
                    </Row>
                </div>
            </div>
        );
    }
}

export default OrderList;