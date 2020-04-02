import { message, Modal } from 'antd'
class Utils {

    // 成功提示信息
    successTips (msg) {
        message.success(msg);
    }

    // 警告提示信息
    warningTips (errMsg) {
        message.warning(errMsg);
    } 

    // 错误弹框
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