import axios from 'axios'

class Axios {
    request (params) {
        return new Promise((resolve, reject) => {
            axios({
                method: params.type || 'get',
                url: params.url,
                data: params.data
            }).then(res => {
                res = res.data
                if (res.status === 0) {
                    resolve(res.data)
                } else {
                    reject(res.msg || res.data);
                }
            }).catch(err => {
                reject(err)
            }) 
        })
    }
}

export default Axios