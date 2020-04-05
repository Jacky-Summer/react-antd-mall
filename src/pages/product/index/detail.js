import React, { Component } from 'react';
import PageTitle from '@components/page-title'
import CategorySelector from './category-selector'
import Product from '@service/product-service.js'
import { Form, Input } from 'antd';
import './detail.less'

const _product = new Product()

class ProductDetail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            name: '',
            subtitle: '',
            categoryId: 0,
            parentCategoryId: 0,
            subImages: [],
            price: '',
            stock: '',
            detail: '',
            status: 1 // 商品状态1为在售
        }
    }

    componentDidMount () {
        this.loadProduct()
    }

    // 加载商品详情
    loadProduct() {
        if(this.state.id) {
            // 有id的时候，表示是编辑功能，需要表单回填
            _product.getProduct(this.state.id).then(res => {
                if(res.subImages) {
                    let subImages = res.subImages.split(',')
                    res.subImages = subImages.map(imgUri => {
                        return {
                            uri: imgUri,
                            url: res.imageHost + imgUri
                        }
                    })
                }
                res.defaultDetail = res.detail
                this.setState(res)
            })
        }
        
    }

    render() {
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };

        return (
            <div className="container">
                <PageTitle title="商品详情"/>
                <div className="content">
                    <Form {...layout}>
                        <Form.Item label="商品名称">
                            <Input value={this.state.name} readOnly/>
                        </Form.Item>

                        <Form.Item label="商品描述">
                            <Input value={this.state.subtitle} readOnly/>
                        </Form.Item>

                        <CategorySelector
                            readOnly
                            parentCategoryId={this.state.parentCategoryId}
                            categoryId={this.state.categoryId}
                        />

                        <Form.Item label="商品价格">
                            <Input type="number" addonAfter="元" value={this.state.price} readOnly/>
                        </Form.Item>

                        <Form.Item label="商品库存">
                            <Input type="number" addonAfter="件" value={this.state.stock} readOnly/>
                        </Form.Item>

                        <Form.Item label="商品图片">
                            {
                                this.state.subImages && this.state.subImages.length ? this.state.subImages.map(
                                    (image, index) => {
                                        return (
                                            <div className="img-con" key={index}>
                                                <img className="img" src={image.url} />
                                            </div>
                                        )
                                    }
                                ) : <div className="no-img">暂无图片</div>
                            }
                        </Form.Item>

                        <Form.Item label="商品详情">
                           <p className="product-detail" dangerouslySetInnerHTML={{__html: this.state.detail}}></p>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

export default ProductDetail;