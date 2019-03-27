import React,{Component} from 'react';
import {Avatar,Row,Col,Icon,Drawer} from 'antd';
import './index.less';
import '../../style/css/iconfont.css';
import NavLeft from '../NavLeft/index.js';
export  default class Chat extends Component {

	state = {
      message: '',
  
      response: [],
      megArray: [],
    }

    handleData(e){
    	this.setState({
    		message:e.target.value
    	})
    }
    sendMessage(){
    	var response="沙雕新"
    	this.setState({
    		megArray: [...this.state.megArray, this.state.message],
    		response: [...this.state.response,response],
    		message: '',
    	})
    }

   
	render() {
		return (
		
				<div  className="chat">


						<div  className="robot">
								<Row>
									
										<div className="img"></div>
										
										<div className="desc">人才库管家为您服务,请按照提示输入指令(或者点击右侧菜单栏)</div>
										

								</Row>
						</div>

						<div className="window" >
						<Row>
 							<div className="contactleft">
				  				<div className="leftAva"></div>
				  				<div className="ballonleft">can I help you?</div>
			  				</div>
			 			</Row>
						{
							  this.state.megArray.map((item,key) =>{
							  	return(
							  		<div>
							  			<Row>
				 							<div className="contactright">
					 							<div className="rightAva"></div>
					 							<div className="ballonright">{item}</div>
				 							</div>
			 							</Row>

							  			<Row>
							  				<div className="contactleft">
								  				<div className="leftAva"></div>
								  				<div className="ballonleft">{this.state.response[key]}</div>
							  				</div>
							  			</Row>
			         	
			 							
			 						</div>

							  	);
							  })
			         	
						}
						  

						</div>

						<div className="contact" >
							<Row>
								<textarea placeholder=" write your order"className="input" autofocus="false" value={this.state.message} onChange={this.handleData.bind(this)} />
								<div className="send">
										<i class="iconfont">&#xec17;</i>&nbsp;&nbsp;
										<i class="iconfont">&#xe668;</i>

									 <button className="button" onClick={this.sendMessage.bind(this)}><i class="iconfont">&#xe622;</i></button>
								</div>
							</Row>
						</div>
					
				</div>
		);
	}
} 