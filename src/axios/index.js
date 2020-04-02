import axios from './http'
import qs from 'qs'
import Utils from '@src/utils'

const _util = new Utils()

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

class Axios {
    request (params) {
        return new Promise((resolve, reject) => {
            let formData = null;
            if (params.data) {
                formData = qs.stringify(params.data) // 转为formData对象
            }
            axios({
                method: params.type || 'get',
                url: params.url || '',
                data: formData
            }).then(res => {
                res = res.data
                if (res.status === 0) {
                    resolve(res.data)
                } else if (res.status === 10) { // 没有登录状态，强制登录
                    this.doLogin()
                } else {
                    reject(res)
                }
            }).catch(err => {
                reject(err)
            }) 
        })
    }

    doLogin () {
        _util.warningTips('请先登录！')
        setTimeout(() => {
            window.location.href = '/login'
        }, 2000)
        
    }
}

export default Axios