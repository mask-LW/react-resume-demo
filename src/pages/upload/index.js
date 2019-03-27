import React,{Component} from 'react';
import {Row,Col,Card,Button,Icon,Modal,Upload,message,Spin, Switch, Alert,Progress } from 'antd';
import axios from 'axios';

const Dragger = Upload.Dragger;

const props = {
  name: 'file',
  multiple: true,
  action: 'http://localhost:8080/resume/resume/upload.do',
  accept: 'text/plain',
  dataType:'json',
  onChange(info) {
  	console.log(info)
  	const status = info.file.status;
    if (status === 'uploading') {
      console.log('uploading');
    }
    if (status === 'done') {
    	if(info.file.response.status === 0){
    		
    		message.success(`${info.file.name} file uploaded successfully.`);
    		//message.error(`${info.file.name} file too large.`);
    	}else if(info.file.response.status === 1){
    		message.error(`${info.file.name}  too large.`);
    	}else if(info.file.response.status === 9){
    		message.error(`${info.file.name}  append too large`);
    	}
     
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    
  },
};



export default class UploadResume extends Component {
	state = {
		count: 0,
		isShow:false,
		isAnalyze:false,
	}

	
	componentWillMount(){
		this.getResumeCount();
	}

	getResumeCount(){
		// axios.get('api/es/getList.json').then((res)=>{
  //           let data = res.data;
  //           console.log(data);
  //           if(data.status == '0' ){
  //               this.setState({
  //                   count:data.count
  //               })
  //           }
            
  //       })
	}


	handleUpload = () => {
		this.setState({
			isShow: true,
		})
	}


	handleSubmit= () => {
		this.setState({
			isShow: false,
			isAnalyze:true,
		})
	}
	handleAnalyze = () =>{
		this.setState({
			isAnalyze:false,
		})

	}
	render() {
		return (
			<Row className="uploadPage">

                <Col span="20" className="example" >
                    


                </Col>
                <Col span="4" className="upload" >
                  <Card>
                  	
	                  	<Button value="large" onClick={this.handleUpload}type="primary">点此上传简历<Icon type="upload" /></Button>
	                  	<div className="tag" >
		                  	
		                  	<br/>
		                  	<strong>tag:</strong>
		                  	 <p>为了解析成功，请严格按照模版填入内容</p>
		                </div>
	               
                  </Card>
                  <Card>
                  	<strong>剩余解析简历数：{this.state.count}</strong>
                  	<Button>点此获取<Icon type="pay-circle" /></Button>
                  </Card>
                </Col>
                <Modal 
                    title="上传简历"
                    visible={this.state.isShow}
                    onCancel={()=>{
                        this.setState({
                            isShow:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                    <Form/>
                </Modal>
                <Modal 
                    title="解析简历"
                    visible={this.state.isAnalyze}
                    onCancel={()=>{
                        this.setState({
                            isAnalyze:false
                        })
                    }}
                    onOk={this.handleAnalyze}
                >
                    <AnalyzeForm/>
                </Modal>
            </Row>
		);
	}
}


class Form extends React.Component{

	


	render(){
		return(
			<Dragger {...props}>
			    <p className="ant-upload-drag-icon">
			      <Icon type="inbox" />
			    </p>
			    <p className="ant-upload-text">将文件拖拽到此区域或直接点击选择</p>
			    <p className="ant-upload-hint">1.只支持上传txt格式的文件</p>
			    <p className="ant-upload-hint">2.简历解析内容：个人基本信息、个人学习经历、个人工作经历</p>
			    <p className="ant-upload-hint">3.请严格按照格式将简历存入txt文件中</p>
			    <p className="ant-upload-hint">4.每个文件最多只能包含100份简历</p>
		  	</Dragger>
		);
	}
}
class AnalyzeForm extends React.Component{

	
	state = { 
		loading: false ,
		percent: 0
	}

	  toggle = (value) => {
	    this.setState({ loading: value });
	    axios.get('http://localhost:8080/resume//resume//parse.do').then((res)=>{
	    	const data = res.data;
	    	if(data.status === 0){
	    		 message.success('解析成功');
	    		 this.setState({
	    		 	loading: false ,
	    		 	percent: 100,
	    		 })
	    	}else{
	    		message.error('解析失败');
	    	}
	    })
	  }

	render(){

		return(
			<Card>
				<div>
		        <Spin spinning={this.state.loading}>
		         <Alert
			        description="后端解析简历存入数据库并选取数据存入es搜索引擎"
			        type="info"
			      />
		          
		        </Spin>
		         <Progress percent={this.state.percent} />
		        <div style={{ marginTop: 16 }}>
		          点击开始解析：<Switch checked={this.state.loading} onChange={this.toggle} />
		        </div>
      </div>
			</Card>
		);
	}
}