import React, { Component } from 'react';
import { Table } from 'antd'
import './index.less'
class TableList extends Component {
    constructor (props) {
        super(props)
    }
    render() {
        const { list, columns, rowKey, paginationProps } = this.props
        return (
            <Table
                className="table-list" 
                dataSource={list} 
                columns={columns}
                rowKey={rowKey} 
                bordered
                pagination={paginationProps}
            />
        );
    }
}

export default TableList;