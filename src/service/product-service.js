import Axios from '@src/axios'

const _axios = new Axios()

class Product {
    // 获取商品列表
    getProductList (listParam) {
        let url  = '',
            data = {}
        data.pageNum = listParam.pageNum
        if (listParam.listType === 'search') {
            url = '/manage/product/search.do'
            data[listParam.searchType] = listParam.searchKeyword
        } else {
            url = '/manage/product/list.do' 
        }
        return _axios.request({
            type: 'post',
            url: url,
            data: data
        })
    }

    // 改变商品状态
    setProductStatus (productInfo) {
        return _axios.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        })
    }

    // 根据父品类id获取品类列表
    getCategoryList (parentCategoryId) {
        return _axios.request({
            type: 'post',
            url: '/manage/category/get_category.do',
            data: {
                categoryId: parentCategoryId
            }
        })
    }

    // 保存商品
    saveProduct (product) {
        return _axios.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: product
        })
    }

    // 获取商品详情 
    getProduct (productId) {
        return _axios.request({
            type: 'post',
            url: '/manage/product/detail.do',
            data: {
                productId
            }
        })
    }
    
}

export default Product