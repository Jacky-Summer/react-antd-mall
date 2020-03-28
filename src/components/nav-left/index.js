import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import MenuConfig from '../../config/menuConfig'
import {
    DesktopOutlined,
    PieChartOutlined,
    FileOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import './index.less'
  
const { SubMenu } = Menu;
class NavLeft extends Component {
    
    renderMenu = (data) => {
        return data.map(item => {
            if(item.children) {
                return (
                    <SubMenu key={item.key} title={item.title}>
                        { this.renderMenu(item.children) }                     
                    </SubMenu>
                )
            }
            return (
                <Menu.Item key={item.key}>
                    <NavLink to={item.key} activeClassName="ant-menu-item-selected">{item.title}</NavLink>
                </Menu.Item>
            )
        })
    }

    UNSAFE_componentWillMount () {
        const menuTreeNode = this.renderMenu(MenuConfig)
        this.setState({
            menuTreeNode
        })
    }

    render() {
        return (
            <div>
                <div className="logo">
                    <h1>MALL ADMIN</h1>
                </div>
                <Menu theme="dark" mode="vertical">
                    {this.state.menuTreeNode}
                   {/* <Menu.Item key="1">
                        <PieChartOutlined />
                        <span>Option 1</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <DesktopOutlined />
                        <span>Option 2</span>
                    </Menu.Item>
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                            <UserOutlined />
                            <span>User</span>
                            </span>
                        }
                    >
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                            <TeamOutlined />
                            <span>Team</span>
                            </span>
                        }
                    >
                        <Menu.Item key="6">Team 1</Menu.Item>
                        <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                    <FileOutlined />
                    </Menu.Item> */}
                </Menu>
            </div>
        );
    }
}

export default NavLeft;