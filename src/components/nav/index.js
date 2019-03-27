import React,{Component} from 'react';

import { Menu, Icon } from 'antd';
import { NavLink } from 'react-router-dom'
import './index.less';
export  default class Nav extends Component {
	state = {
    current: 'mail',
  }

  handleClick = (e) => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  }
	render() {
		return (
			<div >
				<Menu
			        onClick={this.handleClick}
			        selectedKeys={[this.state.current]}
			        mode="horizontal"
			      >
			        <Menu.Item key="mail">
			          <NavLink to="/user/city"><Icon type="mail" />人才库列表</NavLink>
			        </Menu.Item>
			        <Menu.Item key="app" >
			          <Icon type="appstore" />上传简历
			        </Menu.Item>			       
			        <Menu.Item key="alipay">
			         <Icon type="mail" />人才库分析
			        </Menu.Item>
			         <Menu.Item key="alip">
			           <Icon type="mail" />标签管理
			        </Menu.Item>
			      </Menu>

			</div>
		);
	}
}