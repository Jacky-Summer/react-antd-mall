import Axios from '@src/axios'

const _axios = new Axios()

class Product {
    // 获取商品列表
    getProductList (listParam) {
        return _axios.request({
            method: 'post',
            url: '/manage/product/list.do'
        })
    }
}

export default Product