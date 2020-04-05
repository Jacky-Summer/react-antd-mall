import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PageTitle from '@components/page-title'
import ListSearch from './index-list-search'
import { Row, Col, Button, Modal } from 'antd'
import Product from '@service/product-service.js'
import TableList from '@components/table-list'
import Utils from '@src/utils'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import './index.less'

const _product = new Product()
const _util = new Utils()

class ProductList extends Component {
    _isMounted = false

    constructor (props) {
        super(props)
        this.state = {
            pageNum: 1,
            total: 0,
            listType: 'list'
        }
    }

    loadProductList () {   
        let listParam = {}
        listParam.pageNum = this.state.pageNum
        listParam.listType = this.state.listType
        if (this.state.listType === 'search') {
            listParam.searchType = this.state.searchType
            listParam.searchKeyword = this.state.searchKeyword
        }   
        if (this._isMounted) {
            _product.getProductList(listParam).then(res => {
                this.setState({
                    list: res.list,
                    current: res.pageNum,
                    pageSize: res.size,
                    total: res.total
                }, () => {
                    this._isMounted = false
                })
            })
        } 
    }

    componentDidMount () {
        this._isMounted = true
        this.loadProductList()
    }

    componentWillUnmount () {
        this._isMounted = false
    }
    
    onSetProductStatus (productId, status) {
        let newStatus = status === 1 ? 2 : 1
        Modal.confirm({
            title: '确认提示',
            icon: <ExclamationCircleOutlined />,
            content: status === 1 ? '你确认要下架该商品吗' : '你确认要上架该商品吗',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                _product.setProductStatus({
                    productId,
                    status: newStatus
                }).then(res => {
                    _util.successTips(res)
                    this.loadProductList()
                })
            }
        }); 
    }

    
    handleChangeStatus () {

    }

    onSearch (searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list': 'search'
        this.setState({
            listType,
            searchType,
            searchKeyword,
            pageNum: 1
        }, () => {
            this.loadProductList()
        })
    }
    
    render() {

        const columns = [
            {
                title: '商品ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '信息',
                render: (text, record) => (
                    <span>
                        <p>{record.name}</p>
                        <p>{record.subtitle}</p>     
                    </span> 
                 ) 
            },
            {
                title: '价格',
                dataIndex: 'price',
                key: 'price',
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status',
                render: (status, record) => {
                    return (
                        <>
                            <p className="product-status">{ status == 1 ? '在售' : '已下架' }</p>
                            <Button 
                                size="small" 
                                type="primary"
                                onClick={() => this.onSetProductStatus(record.id, record.status)}
                            >
                                { status === 1 ? '下架' : '上架' }
                            </Button>
                        </>
                    ) 
                }
            },
            {
                title: '操作',
                dataIndex: '',
                key: 'x',
                render: (text, record) => (
                    <>
                        <Link to={`/product/detail/${record.id}`} className="view">查看</Link>
                        <Link to={`/product/save/${record.id}`}>编辑</Link>
                    </>
                ),
            },
        ]

        const paginationProps = {
            current: this.state.current,
            size: this.state.size,
            total: this.state.total,
            onChange: (page) => {
                this.state.pageNum = page
                this.loadProductList()
            },
            showTotal: () => {
                return `共有 ${this.state.total} 条数据`
            },
            showQuickJumper: true
        }

        return (
            <div className="container">
                <PageTitle title="商品列表"/>
                <div className="content">
                    <ListSearch onSearch={(searchType, searchKeyword) => { this.onSearch(searchType, searchKeyword)}}>
                        <Col span="10" className="add-container">
                            <Link to='/product/save'>
                                <Button type="primary"><PlusOutlined />添加商品</Button>
                            </Link> 
                        </Col>
                    </ListSearch> 
                    <Row>
                        <TableList 
                            list={this.state.list} 
                            columns={columns}
                            rowKey={ record => record.id } 
                            paginationProps={paginationProps}
                        />
                    </Row>
                </div>
            </div>
        );
    }
}

export default ProductList;