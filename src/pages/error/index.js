import React, { Component } from 'react';
import PageTitle from '@components/page-title'
import { Link } from 'react-router-dom'

class ErrorPage extends Component {
    render() {
        return (
            <div className="container">
                <PageTitle title="出错啦！"/>
                <div className="content">
                    <span>找不到该路径，</span>
                    <Link to='/'>点我返回首页</Link>
                </div>
            </div>
        );
    }
}

export default ErrorPage;