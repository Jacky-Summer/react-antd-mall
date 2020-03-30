import { message, Modal } from 'antd'
class Utils {
    warningTips (errMsg) {
        message.warning(errMsg);
    } 

    errorAlert (errMsg) {
        Modal.error({
            title: '发生错误！',
            content: errMsg,
        });
    }

    // 本地存储
    setStorage (name, data) {
        let dataType = typeof data
        if (dataType === 'object' && dataType !== 'null') {
            window.localStorage.setItem(dataType, JSON.stringify(data))  // json对象
        } else if(['string', 'number', 'boolean'].indexOf(dataType) >= 0) {
            window.localStorage.setItem(name, data) // 基础类型
        } else {
            this.errorAlert('该类型不能用于本地存储')
        }
    }
}

export default Utils