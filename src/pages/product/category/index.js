import React, { Component } from 'react';
import PageTitle from '@components/page-title'
import TableList from '@components/table-list'
import Product from '@service/product-service.js'
import Utils from '@src/utils'
import { Link } from 'react-router-dom'
import { Row, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const _product = new Product()
const _util = new Utils()

class ProductCategory extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            parentCategoryId: this.props.match.params.id || 0
        }
    }

    componentDidMount () {
        this.loadCategoryList()
    }

    componentDidUpdate (prevProps, prevState) {
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.id
        if (oldPath !== newPath) {
            this.setState({
                parentCategoryId: newId
            }, () => {
                this.loadCategoryList()
            })
        }
    }

    loadCategoryList () {
        _product.getCategoryList(this.state.parentCategoryId).then(res => {
            this.setState({
                list: res
            })
        })
    }

    onUpdateName (id, categoryName) {

        let productName = window.prompt('输入你要修改的名称', categoryName)
        if (productName) {
            let category = {
                categoryId: id,
                categoryName: productName
            }
            _product.updateCategoryName(category).then(res => {
                _util.successTips(res)
                this.loadCategoryList()
            })
        }
    }

    render() {

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '品类名称',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: (text) => {
                    return new Date(text).toLocaleString() 
                }
            },
            {
                title: '操作',
                dataIndex: '',
                render: (text, record) => (
                    <>
                        <a className="view" onClick={() => {this.onUpdateName(record.id, record.categoryName)}}>修改名称</a>
                        {this.state.parentCategoryId === 0 ? <Link to={`/product-category/index/${record.id}`}>查看子品类</Link> : null}  
                    </>
                ),
            },
        ]

        return (
            <div className="container">
                <PageTitle title="品类列表">
                    <Link to='/product-category/add'>
                        <Button type="primary"><PlusOutlined />添加品类</Button>
                    </Link> 
                </PageTitle>
                    
                <div>
                    <Row>
                        <TableList 
                            list={this.state.list} 
                            columns={columns}
                            rowKey={ record => record.id } 
                            paginationProps={false}
                        />
                    </Row>
                </div>
            </div>
        );
    }
}

export default ProductCategory;