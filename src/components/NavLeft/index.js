import React,{Component} from 'react';
import {Menu,Icon,List} from 'antd';
import Menuconfig from './../../config/menuConfig.js';
import './index.less';
import { NavLink } from 'react-router-dom'
const SubMenu = Menu.SubMenu;




export default class NavLeft extends Component{

  componentWillMount(){
    const menuTreeNode =   this.renderMenu(Menuconfig);

    this.setState({
      menuTreeNode
    })
  }
  renderMenu = (data) =>{
    return data.map((item)=>{
      if(item.children){
        return (
          <SubMenu
            title = {item.title} key={item.key}>
            {this.renderMenu(item.children)}
          
          </SubMenu>

        )
      }
      return <Menu.Item  title={item.title} key={item.key}>
            <NavLink to={item.key}>{item.title}</NavLink>
          </Menu.Item>
          
    })

  }

	render (){
		return(
			<div className="left" >
				<div className="logo">
					<img src="/assets/logo-ant.svg" alt=""/>
					<h1>talent manager</h1>
				</div>
				<Menu theme="day">
        {this.state.menuTreeNode}
        </Menu>
			</div>
			)
		;
	}
}





