import Axios from '@src/axios'

const _axios = new Axios()

class Statistic {
    getHomeCount () {
        return _axios.request({
            url: '/manage/statistic/base_count.do'
        })
    }
}

export default Statistic