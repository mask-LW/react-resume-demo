import React,{Component} from 'react';
import {Card ,Row,Col,Icon,Button,Input,Radio,Modal,Form} from 'antd';
import axios from 'axios';
import './index.less';
import '../../style/css/iconfont.css';
const dateFormat = 'YYYY-MM-DD';
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
export default class EditResume extends Component{
	state = {
		value: "",
		isShowEdu: false,
		isShowWork: false,
		isShowEduDelete: false,
		isShowWorkDelete:false,
		isShowDeleteResume: false,
		workExpId: "",
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

				createTime: "",
				edu: "",
				id: "",
				pro: "",
				resumeId: "",
				school: "",
				status:"",
				time: "",
				updateTime: null,
			}],
			resumeWorkExpList:[{
				company: "",
				createTime: "",
				department: "",
				id: "",
				job: "",
				resumeId: "",
				status: "",
				time: "",
				updateTime: null
			}],
		}
	}
	onChangeSex = (e) => {
    
   const sex = e.target.value;
   console.log(sex)
    this.setState({
      value: sex,
    });
   console.log(this.state.value)
   
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
  			this.setState({
  				value: this.state.data.sex
  			})
  			
		})
	}

	handleShowEdu = () =>{
		this.setState({
			isShowEdu:true
		})
	} 
	handleShowWork = () =>{
		this.setState({
			isShowWork:true
		})
	} 

	handleShowEduOk = () =>{
		let cityinfo = this.cityForm.props.form.getFieldsValue();
		axios.post('http://localhost:8080/resume//resume//detail.do', {
		     school: cityinfo.school,
		     pro: cityinfo.pro,
		     edu: cityinfo.edu,
		     time: cityinfo.time
	    }).then((res) => {
	    	let data = res.data;
	    	this.setState({
  				data: data.data
  			})
	    })
	    this.setState({
			isShowEdu:false
		})
		 
	}

	handleShowEduCancel = ()=>{
		this.setState({
			isShowEdu:false
		})
	}

	handleShowWorkOk = () =>{
			let cityinfo = this.cityForm.props.form.getFieldsValue();
		axios.post('http://localhost:8080/resume//resume//detail.do', {
		     company: cityinfo.company,
		     job: cityinfo.job,
		     time: cityinfo.time
	    }).then((res) => {
	    	let data = res.data;
	    	this.setState({
  				data: data.data
  			})
	    })
	    this.setState({
			isShowWork:false
		})
	}

	handleShowWorkCancel = ()=>{
		this.setState({
			isShowWork:false
		})
	}

	handleEduDelete (id){
		this.setState({
			isShowEduDelete:true,
			schoolExpId:id
		})
	}

	handleWorkDelete (id){
		
		this.setState({
			isShowWorkDelete:true,
			workExpId: id,
		})
	}

	handleEduDeleteCancel = ()=>{
		this.setState({
			isShowEduDelete:false
		})
	}

	handleEduDeleteOk(){
		console.log(this.state.schoolExpId)
		// axios.post('http://localhost:8080/resume//resume//detail.do', {
		//      resumeId:id
	 //    }).then((res) => {
	 //    	let data = res.data;
	 //    	this.setState({
  // 				data: data.data
  // 			})
	 //    })
	   this.setState({
			isShowEduDelete:false
		})
	}

	handleWorkDeleteOk(){
		console.log(this.state.workExpId)
		this.setState({
			isShowWorkDelete:false
		})
	}

	handleWorkDeleteCancel = () => {
		this.setState({
			isShowWorkDelete:false
		})
	}
	handleEduSave(id){
		console.log(id)
	}
	handleWorkSave(id){
		console.log(id)
	}
	handleInfoSave(id){
		console.log(id)
	}
	handleInfoDelete = () => {
		this.setState({
			isShowDeleteResume: true
		})
	}
		
	handleDeleteResumeOk(id){
		console.log(id)
		this.setState({
			isShowDeleteResume: false
		})
	}
	handleDeleteResumeCancel = () => {
		this.setState({
			isShowDeleteResume: false
		})
	}

	
	render() {
		return (
			<div className="edit">
				<Card/>
				<div className="editPage">
					<div style={{height:1, marginTop:-1,clear: "both",overflow:"hidden"}}></div> 
					<div className="editDetail">
						<Card>
							<div className="message">
								基本信息
							</div>
							<br/>

							<Row>
								<Col span="3" style={{height:32}}>
		                            <label   style={{float:"right",lineHeight: 2}}>姓名：</label>	                           
	                           	</Col>
	                           	<Col span="9">
	                           	<Input style={{width:240}} value={this.state.data.name} />
	                        	</Col>
	                        	<Col span="3" style={{height:32}}>
		                            <label style={{float:"right",lineHeight: 2}}>出生时间：</label>	                           
	                           	</Col>
	                           	<Col span="9">
	                           		<Input style={{width:240}} value={this.state.data.born} />
	                        	</Col>
							</Row>
							<br/>
							<Row>
								<Col span="3" style={{height:32}}>
		                            <label   style={{float:"right",lineHeight: 2}}>照片：</label>	                           
	                           	</Col>
	                           	<Col span="9">
	                           		<img src="/assets/head-picture.jpg" height="80" alt=""/>
	                        	</Col>
	                        	<Col span="3" style={{height:32}}>
		                            <label style={{float:"right",lineHeight: 2}}>性别：</label>	                           
	                           	</Col>
	                           	<Col span="9">
	                           		<div style={{ marginTop: 4 }}>
	                           		 <RadioGroup   onChange={this.onChangeSex} value={this.state.value} >
	                           		 	<Radio value={0}>男</Radio>
        								<Radio value={1}>女</Radio>
	                           		 </RadioGroup>
	                        		</div>
	                        	</Col>
							</Row>
							<br/>
							<Row>
								<Col span="3" style={{height:32}}>
		                            <label   style={{float:"right",lineHeight: 2}}>邮箱：</label>	                           
	                           	</Col>
	                           	<Col span="9">
	                           	<Input style={{width:240}}value={this.state.data.email}/>
	                        	</Col>
	                        	<Col span="3" style={{height:32}}>
		                            <label style={{float:"right",lineHeight: 2}}>电话：</label>	                           
	                           	</Col>
	                           	<Col span="9">
	                           	<Input style={{width:240}}value={this.state.data.phone} />
	                        	</Col>
							</Row>
							<br/>
							<div className="message">
							</div>
							<br/>
								<Row>
								<Col span="10"></Col>
	                           	<Col span="10">
	                           		<Button type="primary" size="small" onClick={()=>this.handleInfoSave(this.state.data.resumeId)}>保存</Button>&nbsp;&nbsp;&nbsp;
	                           		<Button type="primary" size="small" onClick={this.handleInfoDelete}>删除本条</Button>
	                           		<Modal
							          style={{top:200, left:100,right:100}}
							          visible={this.state.isShowDeleteResume}
							          onOk={() => this.handleDeleteResumeOk(this.state.data.resumeId)}
							          onCancel={this.handleDeleteResumeCancel}
							        >
						        	<p>删除个人信息即删除整个简历信息,是否确认删除</p>
							    </Modal>
		                           	</Col>
		                           	<Col span="4">	
		                           	</Col>
								</Row>

						<br/>
						</Card>
						<br/>
						
						<Card>
						<div className="message">
											教育经历
										</div>
										<br/>
						{
							this.state.data.resumeSchoolExpList.map((item) =>{
								return(
									<div>
										
										<div className="exp">
											<br/>
											<Row>
												<Col span="4" style={{height:32}}>
						                            <label   style={{float:"right",lineHeight: 2}}><i class="iconfont">&#xe74a;</i>&nbsp;学校：</label>	                           
					                           	</Col>
					                           	<Col span="20">
					                           	<Input style={{width:626,height:30}}value={item.school} />
					                        	</Col>
											</Row>
											<br/>
											<Row>
												<Col span="4" style={{height:32}}>
						                            <label   style={{float:"right",lineHeight: 2}}><i class="iconfont">&#xe61f;</i>&nbsp;专业：</label>	                           
					                           	</Col>
					                           	<Col span="20">
					                           	<Input style={{width:626,height:30}}value={item.pro} />
					                        	</Col>
											</Row>
											<br/>
											<Row>
												<Col span="4" style={{height:32}}>
						                            <label   style={{float:"right",lineHeight: 2}}><i class="iconfont">&#xe63c;</i>&nbsp;学历：</label>	                           
					                           	</Col>
					                           	<Col span="20">
					                           	<Input style={{width:626,height:30}}value={item.edu} />
					                        	</Col>
											</Row>
											<br/>
											<Row>
												<Col span="4" style={{height:32}}>
						                            <label   style={{float:"right",lineHeight: 2}}><i class="iconfont">&#xe667;</i>&nbsp;时间：</label>	                           
					                           	</Col>
					                           	<Col span="20">
					                           	<Input style={{width:626,height:30}}value={item.time} />
					                        	</Col>
											</Row>
											<br/>
											<Row>
												<Col span="10"></Col>
					                           	<Col span="10">
					                           		<Button type="primary" size="small" onClick={()=>this.handleEduSave(item.id)}>保存</Button>&nbsp;&nbsp;&nbsp;
					                           		<Button type="primary" size="small" onClick={()=>this.handleEduDelete(item.id)}>删除本条</Button>
					                           	</Col>
					                           	<Col span="4">	
					                           	</Col>
											</Row>
											<br/>
										</div>
										<br/>
									</div>

								)
							})
						}
							<Modal
								style={{top:200, left:100,right:100}}
					          visible={this.state.isShowEduDelete}
					          onOk={this.handleEduDeleteOk.bind(this)}
					          onCancel={this.handleEduDeleteCancel}
					        >
					        <p>是否确定删除？</p>
					       </Modal>
							<Button onClick={this.handleShowEdu}>添加</Button>
							<Modal
							  style={{top:200, left:100,right:100}}
					          title="增加教育经历"
					          visible={this.state.isShowEdu}
					          onOk={this.handleShowEduOk}
					          onCancel={this.handleShowEduCancel}
					        >
					        	<AddEdu wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
					        </Modal>
							
						</Card>
						<br/>
						<Card>
						<div className="message">
								工作经历
						</div>
							<br/>
						{
							this.state.data.resumeWorkExpList.map((item) =>{
								return(
									<div>
										
									
										<div className="exp">
											<br/>
											<Row>
												<Col span="4" style={{height:32}}>
						                            <label   style={{float:"right",lineHeight: 2}}><i class="iconfont">&#xe60d;</i>&nbsp;公司：</label>	                           
					                           	</Col>
					                           	<Col span="20">
					                           	<Input style={{width:626,height:30}}value={item.company} />
					                        	</Col>
											</Row>
											<br/>
											<Row>
												<Col span="4" style={{height:32}}>
						                            <label   style={{float:"right",lineHeight: 2}}><i class="iconfont">&#xe605;</i>&nbsp;职位：</label>	                           
					                           	</Col>
					                           	<Col span="20">
					                           	<Input style={{width:626,height:30}}value={item.job} />
					                        	</Col>
											</Row>
											<br/>
											<Row>
												<Col span="4" style={{height:32}}>
						                            <label   style={{float:"right",lineHeight: 2}}><i class="iconfont">&#xe667;</i>&nbsp;时间：</label>	                           
					                           	</Col>
					                           	<Col span="20">
					                           	<Input style={{width:626,height:30}}value={item.time} />
					                        	</Col>
											</Row>
											<br/>
											<Row>
												<Col span="10"></Col>
					                           	<Col span="10">
					                           		<Button type="primary" size="small" onClick={()=>this.handleWorkSave(item.id)}>保存</Button>&nbsp;&nbsp;&nbsp;
					                           		<Button type="primary" size="small" onClick={()=>this.handleWorkDelete(item.id)}>删除本条</Button>
					                           	</Col>
					                           		<Col span="4">
					                           	</Col>
											</Row>
											<br/>
										</div>
										<br/>
									</div>
								)
							})
						}
						<Modal
						  style={{top:200, left:100,right:100}}
				          visible={this.state.isShowWorkDelete}
				          onOk={this.handleWorkDeleteOk.bind(this)}
				          onCancel={this.handleWorkDeleteCancel}
				        >
				        <p>是否确定删除？</p>
				       </Modal>

							<Button onClick={this.handleShowWork}>添加</Button>

							<Modal
							  style={{top:200, left:100,right:100}}
					          title="增加工作经历"
					          visible={this.state.isShowWork}
					          onOk={this.handleShowWorkOk}
					          onCancel={this.handleShowWorkCancel}
					        >
					        	<AddWork wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
					        </Modal>
						</Card>
						<br/>
						<Button type="primary" shape="round" block><Icon type="save" />保存简历</Button>
						
						</div>
				</div>
				</div>
		);
	}
}


class AddEdu extends Component{
	render() {
		const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        const { getFieldDecorator }  =this.props.form;
					return (
            <Form layout="horizontal">
                <FormItem label="学校" {...formItemLayout}>
                    {
                        getFieldDecorator('school', {
                            initialValue: ''
                        })(
                          <Input style={{ width: 200 }}/>
                        )
                      }
                    
                </FormItem>
                <FormItem label="专业" {...formItemLayout}>
                    {
                        getFieldDecorator('pro', {
                            initialValue: ''
                        })(
                          <Input style={{ width: 200 }}/>
                        )
                      }
                </FormItem>
                 <FormItem label="学历" {...formItemLayout}>
                    {
                        getFieldDecorator('edu', {
                            initialValue: ''
                        })(
                          <Input style={{ width: 200 }}/>
                        )
                      }
                </FormItem>
                
                <FormItem label="时间" {...formItemLayout}>
                    {
                        getFieldDecorator('time', {
                            initialValue: ''
                        })(
                            <Input style={{ width: 200 }}/>
                        )
                    }
                </FormItem>
            </Form>
		);
			
	}
}
AddEdu = Form.create({})(AddEdu);


class AddWork extends Component{
	render() {
		const formItemLayout = {
            labelCol:{
                span:5
            },
            wrapperCol:{
                span:19
            }
        }
        const { getFieldDecorator }  =this.props.form;
		return (
	            <Form layout="horizontal">
	                <FormItem label="公司名称" {...formItemLayout}>
	                    {
	                        getFieldDecorator('company', {
	                            initialValue: ''
	                        })(
	                          <Input style={{ width: 200 }}/>
	                        )
	                      }
	                    
	                </FormItem>
	                <FormItem label="职位名称" {...formItemLayout}>
	                    {
	                        getFieldDecorator('job', {
	                            initialValue: ''
	                        })(
	                          <Input style={{ width: 200 }}/>
	                        )
	                      }
	                </FormItem>
	                
	                
	                <FormItem label="时间" {...formItemLayout}>
	                    {
	                        getFieldDecorator('time', {
	                            initialValue: ''
	                        })(
	                            <Input style={{ width: 200 }}/>
	                        )
	                    }
	                </FormItem>
	            
	            </Form>
		);
	
	}
}
AddWork = Form.create({})(AddWork);