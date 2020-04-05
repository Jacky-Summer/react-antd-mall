import React, { Component } from 'react';
import { Row, Col, Button, Select, Input } from 'antd'
import Utils from '@src/utils'
import './index-list-search.less'

const { Option } = Select;
const _util = new Utils()

class ListSearch extends Component {

    constructor (props) {
        super(props)
        this.state = {
            searchType: 'productId', // productId / productName
            searchKeyword: ''
        }
    }

    onSearch () {
        if (this.state.searchType === 'productId') {
            if (!(/^\d+$/.test(this.state.searchKeyword))) {
                _util.warningTips('商品ID必须为纯数字')
                this.setState({
                    searchKeyword: ''
                })
                return 
            }
        }
        this.props.onSearch(this.state.searchType, this.state.searchKeyword)
    }

    handleSelectChange (value) {
        this.setState({
            searchType: value
        })
    }

    handleInputChange (e) {
        this.setState({
            searchKeyword: e.currentTarget.value 
        })
    }

    onSearchKeywordKeyUp (e) {
        if (e.keyCode === 13) {
            this.onSearch()
        }
    }

    render() {
        return (
            <Row>
                <Col span="14">
                    <Select defaultValue="productId" className="select-options" onChange={(value) => this.handleSelectChange(value)}>
                        <Option value="productId">按商品ID查询</Option>
                        <Option value="productName">按商品名称查询</Option>
                    </Select> 
                    <Input 
                        value={this.state.searchKeyword} 
                        placeholder="关键词" 
                        className="input-keyword" 
                        onChange={(e) => this.handleInputChange(e)}
                        onKeyUp={(e) => this.onSearchKeywordKeyUp(e)}
                    />
                    <Button type="primary" onClick={() => this.onSearch()}>查询</Button>
                </Col>
                {this.props.children}
            </Row>
        );
    }
}

export default ListSearch;