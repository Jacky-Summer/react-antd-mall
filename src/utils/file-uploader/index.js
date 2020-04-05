import React, { Component } from 'react';
import { Button } from 'antd'
import FileUpload from './react-fileupload.js';

class FileUploader extends Component{
    render(){
        const options={
            baseUrl:'/manage/product/upload.do',
            fileFieldName: 'upload_file',
            dataType: 'json',
            chooseAndUpload: true,
            uploadSuccess: (res) => {
                this.props.onSuccess(res.data);
            },
            uploadError: (err) => {
                this.props.onError(err.message || '上传图片出错啦');
            }
        }
        return (
            <FileUpload options={options}>
                <Button 
                type="primary" 
                size="small" 
                ref="chooseAndUpload"
                style={{ marginTop: 15 }}
            >
                请选择图片
            </Button>
            </FileUpload>
        )           
    }
}
export default FileUploader;