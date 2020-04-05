import React, { Component } from 'react';
import PageTitle from '@components/page-title'
import Utils from '@src/utils'
import Product from '@service/product-service.js'
import { Form, Input, Button, Select } from 'antd';

const _util = new Utils()
const _product = new Product()
const { Option } = Select

class ProductSave extends Component {

   
    formRef = React.createRef()

    state = {
        categoryList: []
    }
    
    onFinish = values => {
        _product.saveCategory(values).then(res => {
            _util.successTips(res)
            this.props.history.push('/product-category')
        })
    };

    loadCategoryList () {
        _product.getCategoryList(this.state.parentId).then(res => {
            this.setState({
                categoryList: res
            })
        })
    }

    componentDidMount () {
        this.loadCategoryList()
    }

    render() {

        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };

        const tailLayout = {
            wrapperCol: { offset: 4, span: 19 },
        };

        return (

            <div className="container">
                <PageTitle title="添加商品"/>
                <div className="content">
                    <Form
                        {...layout}
                        name="basic"
                        onFinish={this.onFinish}
                        ref={this.formRef}
                        >
                        <Form.Item
                            label="所属品类"
                            name="parentId"
                            rules={[{ required: true, message: '请输入所属品类!' }]}
                        >
                            <Select>
                            {
                                this.state.categoryList.map(item => {
                                    return <Option value={item.id} key={item.id}>根品类/{item.name}</Option>
                                })
                            } 
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="品类名称"
                            name="categoryName"
                            rules={[{ required: true, message: '请输入品类名称!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item {...tailLayout}>
                            <Button type="primary" htmlType="submit">
                            提交
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default ProductSave;