import React, { Component } from 'react';
import PageTitle from '@components/page-title'
import TableList from '@components/table-list'
import User from '@service/user-service.js'
import { Link } from 'react-router-dom'
import { Row, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const _user = new User()

class UserList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            list: [],
            pageNum: 1,
            total: 0
        }
    }

    componentDidMount () {
        this.loadUserList()
    }

    loadUserList () {
        _user.getUserList(this.state.pageNum).then(res => {
            this.setState(res)
        })
    }

    render() {

        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: '手机号码',
                dataIndex: 'phone',
                key: 'phone'
            },
            {
                title: '注册时间',
                dataIndex: 'createTime',
                key: 'createTime',
                render: (text) => {
                    return new Date(text).toLocaleString() 
                }
            },
        ]

        const paginationProps = {
            current: this.state.pageNum,
            size: this.state.size,
            total: this.state.total,
            onChange: (page) => {
                this.state.pageNum = page
                this.loadUserList()
            },
            showTotal: () => {
                return `共有 ${this.state.total} 条数据`
            },
            showQuickJumper: true
        }

        return (
            <div className="container">
                <PageTitle title="用户列表"/>
                <div>
                    <Row>
                        <TableList 
                            list={this.state.list} 
                            columns={columns}
                            rowKey={ record => record.id } 
                            paginationProps={paginationProps}
                        />
                    </Row>
                </div>
            </div>
        );
    }
}

export default UserList;