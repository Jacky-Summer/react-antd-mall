import React, { Component } from 'react';
import PageTitle from '@components/page-title'
import CategorySelector from './category-selector'
import FileUploader from '@src/utils/file-uploader'
import Utils from '@src/utils'
import Product from '@service/product-service.js'
import RichEditor from '@src/utils/rich-editor'
import { Form, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './save.less'

const _util = new Utils()
const _product = new Product()

class ProductSave extends Component {

    _isMounted = false
    formRef = React.createRef()

    state = {
        id: this.props.match.params.id,
        name: '',
        categoryId: 0,
        parentCategoryId: 0,
        subImages: [],
        detail: ''
    }
    
    onFinish = values => {
        let product = {
            name: values.name,
            subtitle: values.subtitle,
            categoryId: parseInt(this.state.categoryId),
            subImages: this.getSubImagesString(),
            price: parseFloat(values.price),
            stock: parseInt(values.stock),
            detail: this.state.detail,
            status: values.status 
        }
        if (this.state.id) {
            product.id = this.state.id
        }
        if (this._isMounted) {
            _product.saveProduct(product).then(res => {
                if (this._isMounted) {
                    _util.successTips(res)
                    this.props.history.push('/product/index')
                }
            })
        }
    };

    getSubImagesString () {
        return this.state.subImages.map(image => image.uri).join(',')
    }

    // 上传图片成功
    onUploadSuccess (res) {
        let subImages = [...this.state.subImages]
        subImages.push(res)
        this.setState({
            subImages: subImages
        })
    }

    // 上传图片失败
    onUploadError (errMsg) {
        _util.errorAlert(errMsg)
    }

    // 删除图片
    onImageDelete (index) {
        let subImages = [...this.state.subImages]
        subImages.splice(index, 1)
        this.setState({
            subImages: subImages
        })
    }

    // 富文本编辑器的变化
    onDetailValueChange (value) {
        this.setState({
            detail: value
        })
    }

    // 品类选择器变化
    onCategoryChange (categoryId, parentCategoryId){
        this.setState({
            categoryId: categoryId,
            parentCategoryId: parentCategoryId
        })
    }

    // 加载商品详情
    loadProduct () {

        if (this.state.id) {
            _product.getProduct(this.state.id).then(res => {
                if (res.subImages) {
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
                this.formRef.current.setFieldsValue(res);
                this.formRef.current.setFieldsValue({
                    firstCategoryId: res.categoryId,
                    secondCategoryId: res.parentCategoryId
                });
            })
        }
    }

    componentDidMount () {
        this._isMounted = true
        this.loadProduct()
    }

    componentWillUnmount () {
        this._isMounted = false
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
                            label="商品名称"
                            name="name"
                            rules={[{ required: true, message: '请输入商品名称!' }]}
                        >
                            <Input value={this.state.name}/>
                        </Form.Item>

                        <Form.Item
                            label="商品描述"
                            name="subtitle"
                            rules={[{ required: true, message: '请输入商品描述!' }]}
                        >
                            <Input value={this.state.subtitle}/>
                        </Form.Item>
                        <CategorySelector
                            parentCategoryId={this.state.parentCategoryId}
                            categoryId={this.state.categoryId}
                            onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}
                        />

                        <Form.Item
                            label="商品价格"
                            name="price"
                            rules={[{ required: true, message: '请输入商品价格!' }]}
                        >
                            <Input type="number" addonAfter="元" defaultValue={this.state.price}/>
                        </Form.Item>

                        <Form.Item
                            label="商品库存"
                            name="stock"
                            rules={[{ required: true, message: '请输入商品库存!' }]}
                        >
                            <Input type="number" addonAfter="件" defaultValue={this.state.stock}/>
                        </Form.Item>

                        <Form.Item
                            label="商品图片"
                        >
                            {
                                this.state.subImages && this.state.subImages.length ? this.state.subImages.map(
                                    (image, index) => {
                                        return (
                                            <div className="img-con" key={index}>
                                                <img className="img" src={image.url} />
                                                <CloseOutlined className="img-cancel" index={index} onClick={(e) => this.onImageDelete(e)}/>
                                            </div>
                                        )
                                    }
                                ) : <div className="no-img">暂无图片</div>
                            }
                            <FileUploader 
                                onSuccess={(res) => this.onUploadSuccess(res)}
                                onError={(errMsg) => this.onUploadError(errMsg)} 
                            />
                        </Form.Item>

                        <Form.Item
                            label="商品详情"
                        >
                            <RichEditor 
                                defaultDetail={this.state.defaultDetail}
                                onValueChange={(value) => this.onDetailValueChange(value)}
                            />
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