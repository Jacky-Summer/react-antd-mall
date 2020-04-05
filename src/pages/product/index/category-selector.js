import React, { Component } from 'react';
import { Form, Select, Input } from 'antd'
import Product from '@service/product-service.js'
import './category-selector.less'

const { Option } = Select
const _product = new Product()
class CategorySelector extends Component {
    _isMounted = false
    constructor (props) {
        super(props)
        this.state = {
            firstCategoryList: [],
            firstCategoryId: 0,
            secondCategoryList: [],
            secondCategoryId: 0
        }
    }

    componentDidMount () {
        this._isMounted = true
        this.loadFirstCategory()
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId
        // 数据没有发生变化的时候，直接不做处理
        if (!categoryIdChange && !parentCategoryIdChange) {
            return 
        }
         // 假如只有一级品类
         if (nextProps.parentCategoryId === 0) {
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId: 0
            })
        } else {
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            }, () => {
                this.loadSecondCategory()
            })
        }
    }

    componentWillUnmount () {
        this._isMounted = false
    }

    // 选择一级品类
    onFirstCategoryChange (value) {
        if (this.props.readOnly) {
            return
        }
        this.setState({
            firstCategoryId: value,
            secondCategoryId: 0,
            secondCategoryList: []
        }, () => {
            this.loadSecondCategory()
            this.onPropsCategoryChange()
        })
    }

    // 选择二级品类
    onSecondCategoryChange (value) {
        if (this.props.readOnly) {
            return
        }
        this.setState({
            secondCategoryId: value
        }, () => {
            this.onPropsCategoryChange()
        })
    }

    // 加载一级分类
    loadFirstCategory () {
        if (this._isMounted) {
            _product.getCategoryList(this.state.firstCategoryId).then(res => {
                this.setState({
                    firstCategoryList: res
                }, () => {
                    this._isMounted = false
                })
            })
        }
    }

    // 加载二级分类
    loadSecondCategory () {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            })
        })
    }

    onPropsCategoryChange () {
        // 判断props里的回调函数存在
        let categoryChangable = typeof this.props.onCategoryChange === 'function'
        // 如果有二级品类
        if (this.state.secondCategoryId) {
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
        } else {
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
        }
    }

    render() {
        return (
            <div>
                <Form.Item 
                    label="商品分类"
                    className="form-category"
                >
                    <Input.Group compact>
                        <Form.Item  
                            name="firstCategoryId"
                            rules={[{ required: true, message: '请选择一级分类!' }]}
                        >
                            <Select 
                                defaultValue=""
                                value={this.state.firstCategoryId}
                                className="select-category" 
                                onChange={(value) => this.onFirstCategoryChange(value)}
                            >
                                <Option value="">请选择一级分类</Option>
                            {
                                this.state.firstCategoryList.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })
                            }   
                            </Select>
                        </Form.Item>
                        <Form.Item 
                            name="secondCategoryId"
                        >
                            <Select 
                                defaultValue=""
                                value={this.state.secondCategoryId}
                                className="select-category"
                                onChange={(value) => this.onSecondCategoryChange(value)}
                            >
                                <Option value="">请选择二级分类</Option>
                            {
                                this.state.secondCategoryList.map(item => {
                                    return <Option value={item.id} key={item.id}>{item.name}</Option>
                                })
                            }   
                            </Select>
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
            </div>
        );
    }
}

export default CategorySelector;