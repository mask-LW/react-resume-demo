import React,{Component} from 'react';
import {Card ,Row,Col,Icon,List,Menu,Button} from 'antd';
import axios from 'axios';
import './index.less';
import Util from '../../util/util.js';


export default class ResumeDetail extends Component{

	state = {
		current: "mail",
		sex:"",
		data:{
			born: "",
			city:  "",
			createTime: "",
			email: "",
			expectJob: "",
			image: "",
			name: "",
			nation: "",
			nationality: "",
			note: "",
			phone: "",
			resumeId: "",
			resumeSchoolExpList: [{
				createTime: 1552198371000,
				edu: "硕士",
				id: 212,
				pro: "工商管理",
				resumeId: 57,
				school: "北京大学",
				status: 0,
				time: "2014年9月至2016年7月",
				updateTime: null,
			}],
			resumeWorkExpList:[{
				company: "美的集团",
				createTime: 1552198371000,
				department: "冰箱事业部",
				id: 763,
				job: "总账会计",
				resumeId: 57,
				status: 0,
				time: "2007年7月至2009年9月",
				updateTime: null,
			}],
		}
		
	}

	componentWillMount(){
		axios.get('http://localhost:8080/resume//resume//detail.do', {
	    params: {
	     resumeId: 57
	    }
  }).then((res) => {
  			console.log(res.data)
  			this.setState({
  				data: res.data.data
  			})
  			if( this.state.data.sex == 0) {
  				this.setState({
  					sex: '男' 
  				})
  			}else{
  				this.setState({
  					sex: '女' 
  				})
  			}
  			
		})
	}

	render() {
		return (
			<div className="detail">
				<Card/>
				<div className="detailContent">
					<div className="detailWarrper">
					<div className="gutter-example">
						<Row gutter={16}>
							<Col className="gutter-row" span={18}>
							
								<Card size="small">
									上传时间:{Util.formateDate(this.state.data.createTime) }
								</Card>								
								<Card size="small">
									<Col span="16">
										<p> <Icon type="user" />&nbsp;{this.state.data.name} &nbsp;{this.state.sex}&nbsp;/&nbsp;{this.state.data.born}</p>
										<p><Icon type="phone" />&nbsp;电话：无&nbsp;{this.state.data.phone}</p>
										<p><Icon type="mail" />&nbsp;邮箱：无 {this.state.data.email}</p>
										<h3>工作期望</h3>
										<p> <Icon type="environment" />&nbsp;期待城市：无</p>
										<p> <Icon type="tool" />&nbsp;期待职位：无</p>
									</Col>
									<Col span="8">
										<div className="imgtext">
												<img src="/assets/head-picture.jpg" height="100" alt=""/>
												<p>头像</p>
										</div>
									</Col>
								</Card>
									<Menu
							        onClick={this.handleClick}
							        selectedKeys={[this.state.current]}
							        mode="horizontal"
									style={{ 
										backgroundColor:"#e6eaee",

									}}			       
							      >
									<Menu.Item key="mail">
							          <Icon type="schedule" />简历详情
							        </Menu.Item>
						        </Menu>
						        <br/>
						        <Card
						        	size="small"
      								title="教育经历"

						        >
						        	
							        {
							        	this.state.data.resumeSchoolExpList.map((item)=>{
							        		return(
							        			<div>
												    <Row>
											        	<Col span="18">
											        		<span style={{fontWeight: "bold"}}>{item.school}</span>
											        		<br/>
											        		<span style={{fontWeight: "bold"}}>{item.pro}   {item.edu}</span>
											        	</Col>
											        	<Col span="6">
											        		<span><Icon type="calendar" />&nbsp;{item.time}</span>
					      								</Col>
					      							</Row>
					      							<br/>
					      						</div>
							        		)
							        	}
									       
	      								)
						       		} 
						      
						        </Card>
						        <Card
						        	size="small"
      								title="工作经历"
						        >
							        {
								        	this.state.data.resumeWorkExpList.map((item)=>{
								        		return(
								        			<div>
													    <Row>
												        	<Col span="18">
												        		<span style={{fontWeight: "bold"}}>{item.company}</span>
												        		<br/>
												        		<span style={{fontWeight: "bold"}}>{item.department}   {item.job}</span>
												        	</Col>
												        	<Col span="6">
												        		<span><Icon type="calendar" />&nbsp;{item.time}</span>
						      								</Col>
						      							</Row>
						      							<br/>
						      						</div>

								        		)
								        	}
								        )
								    }
							       
      							
						        </Card>
							</Col>
							
							<Col span="6" >
								<Card  title="简历操作" size="middle"> 
									<Button type="primary" style={{width:200}} shape="round" icon="download" size="middle">下载简历</Button>
				
									<Button  style={{width:200,marginTop: 10}} shape="round" icon="edit" size="middle">编辑简历</Button>
									<Button  style={{width:200,marginTop: 10}} shape="round" icon="share-alt" size="middle">分享简历</Button>
									
								</Card>

								<Card  style={{marginTop: 10}}title="简历标签" size="small"> 
									小鸡鸡
								</Card>
							</Col>

						</Row>
						</div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
		);
	}
}