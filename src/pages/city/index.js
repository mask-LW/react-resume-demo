import React from 'react';
import { Card, Button,Input, Table, Slider,Select,Form, Modal, message ,Divider} from 'antd';
import axios from 'axios';
import Utils from './../../util/util';

import './index.less';

const FormItem = Form.Item;
const Option = Select.Option;
const Search = Input.Search;

export default class City extends React.Component{

    state = {
        inputNote:"",
        resumeId:"",
        isShowNote:false,
        dataSource:[],
        loading: false,
        type:0,
        isShowMultiple:false,
        cityinfo:{
          company:"",
          job:"",
          edu:"不限",
          gender:"不限",
          gt_age:20,
          lt_age:70,
        },
        sortOrder:"",
    }
    params = {
        page:1
    }

    componentDidMount(){
        this.requestList();
        console.log(this.state.dataSource)
    }

    //默认请求接口
    requestList = ()=>{
        let _this = this;
        console.log('开始')
        this.setState({ loading: true });
        axios.get('api/es/getList.json').then((res)=>{
            let data = res.data;
            console.log(data);
            if(data.status == '0' ){
                this.setState({
                    dataSource: data.data,
                    loading:false,
                })
            }
            
        })
    }
    handleType(value) {
      this.setState({
        type:value
      })
    }
    searchResume(value){
    console.log(this.state.cityinfo)
    if(value){
          console.log(value)
    this.setState({ loading: true });
        console.log(this.state.type)
        if(this.state.type == 1){
            console.log('人名检索')
            axios.get('http://localhost:8080/resume//es/select_by_name.do',
             {
              params: {
                name: value
                }
              }
            ).then((res)=>{
                let data = res.data;
                console.log(data);
                if(data.status == '0' ){
                    this.setState({
                        dataSource: data.data,
                        loading:false,
                    })
                }
                
            })
        }else{
             console.log('全文检索')
            axios.get('http://localhost:8080/resume/es//query_string.do',
              {
              params: {
                string: value
                }
              }).then((res)=>{
                let data = res.data;
                console.log(data);
                if(data.status == '0' ){
                    this.setState({
                        dataSource: data.data,
                        loading:false,
                    })
                }
                
            })
        }
    }
    else{
            console.log('请输入')
        }   

   }
   handleOpen = ()=>{
        console.log('1')
        console.log(this.state.isShowMultiple)
        this.setState({
            isShowMultiple:true
        })
        console.log('2')
        console.log(this.state.isShowMultiple)
    }
  handleSubmit = () =>{
    let cityinfo = this.cityForm.props.form.getFieldsValue();
    
    let data = this.state.cityinfo;
      data.company=cityinfo.company;
      data.job=cityinfo.job;
      data.edu=cityinfo.edu;
      data.gender=cityinfo.gender;
      data.gt_age=cityinfo.gt_age;
      data.lt_age=cityinfo.lt_age;


    this.setState({
      cityinfo:data,
    })
    console.log(this.state.cityinfo)
    axios.post('https://www.easy-mock.com/mock/5c8a469f93287b240327ce78/example/search',{
              company: cityinfo.company,
              job:cityinfo.job,
              edu:cityinfo.edu,
              gender: cityinfo.render,
              lt_age: cityinfo.age,
            }).then((res)=>{
                let data = res.data;
                console.log(data);
                if(data.status == '0' ){
                    this.setState({ loading: true });
                    message.success('查询成功');
                    this.setState({
                        dataSource: data.data,
                        loading:false,
                        isShowMultiple:false,
                    })
                }
                
            })
        
  }

  onChange = (pagination,filters,sorter) =>{
    this.setState({
      sortOrder:sorter.order
    })
    console.log(filters)
   
  }
  
  handleInputNote = (e) => {
    this.setState({
      inputNote:e.target.value
    })
    console.log(this.state.inputNote);
  }
  handleAddNote = () =>{
    axios.get('',
        {
        params: {
          note: this.state.inputNote,
          resumeId: this.state.resumeId,
          }
        }).then((res)=>{
          let data = res.data;
          if(data.status == '0' ){
              this.setState({
                isShowNote:false
              })
          }
          
      })
  }

    render() {

        const columns = [{
          title: 'Name',
          dataIndex: 'name',
          key:'name',
          filtered:true,
          render: text =>(
              <div dangerouslySetInnerHTML={{ __html:text}}/>
            )
        }, {
          title: 'age',
          dataIndex: 'age',
          sorter: (a, b) => a.age - b.age,
          sortOrder: this.state.sortOrder,
          key:'age',
           render: text =>(
              <div dangerouslySetInnerHTML={{ __html:text}}/>
            )
        },{
          title: 'Gender',
          dataIndex: 'gender',
          filters: [
          { text: '男', value: '男' },
          { text: '女', value: '女' },
           
      ],
      render: text =>(
              <div dangerouslySetInnerHTML={{ __html:text}}/>
            ),
      onFilter: (value, record) => record.render.includes(value),
          
        }, {
          title: 'nationality',
          dataIndex: 'nationality',
           render: text =>(
              <div dangerouslySetInnerHTML={{ __html:text}}/>
            )
        },


        {
          title: 'edu',
          dataIndex: 'edu',
         filters: [
          { text: '专科', value: '专科' },
          { text: '本科', value: '本科' },
          { text: '硕士', value: '硕士' },
          { text: '博士', value: '博士' },
      ],
      onFilter: (value, record) => 
          record.edu.includes(value),
           render: text =>(
              <div dangerouslySetInnerHTML={{ __html:text}}/>
            )
        },

        {
          title: 'pro',
          dataIndex: 'pro',
           render: text =>(
              <div dangerouslySetInnerHTML={{ __html:text}}/>
            )
        },
        {
          title: 'school',
          dataIndex: 'school',
           render: text =>(
              <div dangerouslySetInnerHTML={{ __html:text}}/>
            )
        },
        {
          title: 'job',
          dataIndex: 'job',
          render: text =>(
              <div dangerouslySetInnerHTML={{ __html:text}}/>
            )
        },
        {
          title: 'currentCompany',
          dataIndex: 'currentCompany',
          render: text =>(
              <div dangerouslySetInnerHTML={{ __html:text}}/>
            )
        },
        {
          title: 'note',
          dataIndex: 'note',
           render: text =>(
              <div dangerouslySetInnerHTML={{ __html:text}}/>
            )
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            //record获取id
            //todo-> 路由传递参数到简历显示页面，显示组装简历类
            <span>
               <Button onClick={()=>{
                        console.log(record.resumeId)
                        this.setState({
                            isShowNote:true,
                            resumeId:record.resumeId,
                        })
                    }}>
                添加标签
                </Button>
                 
              <a href="javascript:;">删除</a>
              <Divider type="vertical" />
              <a href="javascript:;">编辑</a>
            </span>
          ),
         
        }];
        return (
            <div >
                <Modal 
                    title="简历标签"
                    visible={this.state.isShowNote}
                    onCancel={()=>{
                        this.setState({
                            isShowNote:false
                        })
                    }}
                    onOk={this.handleAddNote}

                >
                 <Input value={this.state.inputNote}  onChange={this.handleInputNote} placeholder=""></Input>
                </Modal>
                    <Select defaultValue="0" style={{ width: 100 }} onChange={value=>this.handleType(value)}>
                        <Option value="0">全文检索</Option>
                        <Option value="1">人名检索</Option>
                   </Select>
                   <Search 
                    placeholder="input search text"
                    onSearch={(value) => this.searchResume(value)}
                    style={{ width: 400  }}
                  />
                  <Button type="primary" onClick={this.handleOpen}>精确条件查询</Button>
                  <br/>
                <div className="content-wrap">
                
                   <Table
                          bordered
                          filtered="true"
                          columns={columns}
                          dataSource={this.state.dataSource}
                          loading={this.state.loading}
                          pagination={this.state.pagination}
                          onChange={this.onChange}
                          
                      />
               
               </div>
               <Modal 
                    title="精确条件查询"
                    visible={this.state.isShowMultiple}
                    onCancel={()=>{
                        this.setState({
                            isShowMultiple:false
                        })
                    }}
                    onOk={this.handleSubmit}
                >
                     <MulSearchForm wrappedComponentRef={(inst)=>{this.cityForm = inst;}}/>
                </Modal>
            </div>
        );
    }
}

class MulSearchForm extends React.Component{
    render(){
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
                
                
                <FormItem label="学历" {...formItemLayout}>
                    {
                        getFieldDecorator('edu', {
                            initialValue: '不限'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="不限">不限</Option>
                                <Option value="专科">专科</Option>
                                <Option value="本科">本科</Option>
                                <Option value="硕士">硕士</Option>
                                <Option value="博士">博士</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="选择性别" {...formItemLayout}>
                    {
                        getFieldDecorator('gender',{
                            initialValue:'不限'
                        })(
                            <Select style={{ width: 100 }}>
                                <Option value="不限">不限</Option>
                                <Option value="男">男</Option>
                                <Option value="女">女</Option>
                            </Select>
                        )
                    }
                </FormItem>

                
                  <FormItem label="年龄"
                    style={{ marginBottom: 0 }}
                    {...formItemLayout}>
                    <FormItem  style={{ display: 'inline-block', width: 'calc(50px)' }}{...formItemLayout}>
                      {getFieldDecorator('gt_age',{
                        initialValue:'20'
                      })(

                        <Input style={{ width: 50 }}/>
                      )}
                     </FormItem>
                      <span style={{ display: 'inline-block', width: '24px', textAlign: 'center' }}>
                        -
                      </span>
                     <FormItem  style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}{...formItemLayout}>
                      {getFieldDecorator('lt_age',{
                        initialValue:'70'
                      })(

                        <Input style={{ width: 50 }}/>
                      )}
                      </FormItem>  
                  </FormItem>
                  
                

            </Form>
        );
    }
}
//利于数据交互
MulSearchForm = Form.create({})(MulSearchForm);
