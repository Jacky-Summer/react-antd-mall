import React, { Component } from 'react';
import PageTitle from '@components/page-title'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import Service from '@service/statistic-service.js'
import {
  UserOutlined,
  ShopOutlined,
  OrderedListOutlined
} from '@ant-design/icons';
import './index.less'

const _statistic = new Service()

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      userCount: '-',
      productCount: '-',
      orderCount: '-'
    }
  }

  componentDidMount () {
    this.loadCount()
  }

  loadCount = () => {
    _statistic.getHomeCount().then(res => {
      this.setState(res)
    })
  }

  render () {
    return (
      <div className="container">
        <PageTitle />
        <Row className="content home-wrap" justify="space-around" id="home-wrap">
            <Col span={6} className="color-box brown" >
              <Link to='/'>
                <p className="count">{this.state.userCount}</p>
                <p className="desc">
                <UserOutlined /> 用户总数
                </p>
              </Link>
            </Col>
            <Col span={6} className="color-box green">
              <Link to='/'>
                <p className="count">{this.state.productCount}</p>
                <p className="desc">
                  <ShopOutlined /> 商品总数
                </p>
              </Link>
            </Col>
            <Col span={6} className="color-box blue">
              <Link to='/'>
                <p className="count">{this.state.orderCount}</p>
                <p className="desc">
                  <OrderedListOutlined /> 订单总数
                </p>
              </Link>
            </Col>
        </Row>
      </div>
    )
  }
}

export default Home;
