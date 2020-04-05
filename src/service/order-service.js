import Axios from '@src/axios'

const _axios = new Axios()

class Order {
    // 获取订单列表
    getOrderList(listParam) { 
        let url = '',
            data = {}
        if (listParam.listType === 'list'){
            url = '/manage/order/list.do';
            data.pageNum = listParam.pageNum;
        } else if(listParam.listType === 'search'){
            url = '/manage/order/search.do';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
        }
        return _axios.request({
            type: 'post',
            url: url,
            data: data
        });
    }

    // 加载订单详情
    getOrderDetail (orderNo) {
        return _axios.request({
            type: 'post',
            url: '/manage/order/detail.do',
            data: {
                orderNo
            }
        })
    }
}

export default Order