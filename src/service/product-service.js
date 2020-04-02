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
        console.log(listParam)
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
}

export default Product