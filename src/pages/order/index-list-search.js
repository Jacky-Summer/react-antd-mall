import React, { Component } from 'react';
import { Row, Col, Button, Select, Input } from 'antd'
import Utils from '@src/utils'

const { Option } = Select;
const _util = new Utils()

class ListSearch extends Component {

    constructor (props) {
        super(props)
        this.state = {
            orderNumber: ''
        }
    }

    onSearch () {
        if (this.state.orderNumber && !(/^\d+$/.test(this.state.orderNumber))) {
            _util.warningTips('订单ID必须为纯数字')
            this.setState({
                searchKeyword: ''
            })
            return 
        }
        this.props.onSearch(this.state.orderNumber)
    }

    handleInputChange (e) {
        this.setState({
            orderNumber: e.currentTarget.value 
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
                    <Select defaultValue="orderNumber" className="select-options" onChange={(value) => this.handleSelectChange(value)}>
                        <Option value="orderNumber">按订单ID查询</Option>
                    </Select> 
                    <Input 
                        value={this.state.orderNumber} 
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