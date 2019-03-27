import React,{Component} from 'react';
import {Row,Col,BackTop,Drawer} from 'antd';
import NavLeft from './components/NavLeft';
import Header from './components/Header';
import Nav from './components/nav';
import Head from './components/head';
import Chat from './components/chat';
import Robot from './components/robot';
import ChatRobot from './components/chatRobot';
import Footer from './components/Footer';
import Home from './pages/home'
import './style/common.less';

export default class User extends Component{

  state = { showDrawer:false,};

    handleDrawer(){
      this.setState({
        showDrawer:true,
      })
    }
     onClose = () => {
    this.setState({
      showDrawer: false,
    });
  };
	render(){
		// // return(
		// // 	<Row className="container">

  // //               <Col span="4" className="nav-left">
  // //                   <Nav/>
  // //               </Col>
  // //               <Col span="20" className="main">
  // //                   <Head/>
  // //                   <Row className="content">
  // //                      {this.props.children}
  // //                   </Row>
  //                  <Row className="content">
  //                  {this.props.children}
  //                </Row>
  //                <Footer/>
  // //               </Col>
  // //           </Row>

		// // );
        return(
            <div>
                
                <BackTop />
                 <Head/>
                 <div className="nav">
                  <Chat/>
                  <button className="draw" onClick={this.handleDrawer.bind(this)}><i class="iconfont">&#xe613;</i></button>
                 </div>
                  
                  
                 <Drawer
                          placement="right"
                          closable={false}
                          onClose={this.onClose}
                          visible={this.state.showDrawer}
                        >
                        <NavLeft/>
                 </Drawer>
                 <div className="content">
                  {this.props.children}
                 </div>
              
            </div>
        );
	}
}