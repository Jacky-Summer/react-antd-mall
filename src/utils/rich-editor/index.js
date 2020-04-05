import React, { Component } from 'react'
import Simditor from 'simditor'
import $ from 'jquery'
import 'simditor/styles/simditor.scss';

class RichEditor extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount () {
        this.loadEditor()
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if(this.props.defaultDetail !== nextProps.defaultDetail) {
            this.simditor.setValue(nextProps.defaultDetail)
        }
    }

    loadEditor() {
        let element = this.refs['textarea']
        this.simditor = new Simditor({
            textarea: $(element),
            defaultValue: this.props.placeholder || '请输入商品详情',
            upload: {
                url: '/manage/product/richtext_img_upload.do',
                fileKey: 'upload_file'
            }
        });
        this.bindEditorEvent()
    }

    // 初始化富文本编辑器的事件
    bindEditorEvent(){
        this.simditor.on('valuechanged', e => {
            this.props.onValueChange(this.simditor.getValue())
        })
    }

    render() {
        return (
            <div className="rich-editor">
                <textarea ref="textarea"></textarea>
            </div>
        )
    }
}

export default RichEditor