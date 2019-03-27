
import React,{Component} from 'react';
import Highlighter from 'react-highlight-words';
import { Table ,Select,Divider,Input,Tooltip,Button,Row,Col,Collapse, Icon} from 'antd';
import reqwest from 'reqwest';
import axios from 'axios';
//数据结构
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  
  width: 30,
  key:'name',
  filtered:true,
}, {
  title: 'age',
  dataIndex: 'age',
  width: 30,
  
  key:'age',
},{
  title: 'Gender',
  dataIndex: 'render',
  width: 30,
  
}, {
  title: 'nationality',
  dataIndex: 'nationality',
  width: 30,
},


{
  title: 'edu',
  dataIndex: 'edu',
  width: 30,
},

{
  title: 'pro',
  dataIndex: 'pro',
  width: 70,
},
{
  title: 'school',
  dataIndex: 'school',
  width: 70,
},
{
  title: 'job',
  dataIndex: 'job',
  width: 80,
},
{
  title: 'currentCompany',
  dataIndex: 'currentCompany',
  width: 120,
},
{
  title: 'note',
  dataIndex: 'note',
  width: 50,
},
{
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">添加标签</a>
      <Divider type="vertical" />
      <a href="javascript:;">删除</a>
      <Divider type="vertical" />
      <a href="javascript:;">编辑</a>
    </span>
  ),
  width: 100,
}];
const Search = Input.Search;
const Option = Select.Option;
const Panel = Collapse.Panel;

export  default  class SearchList extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
    type: 0,
    display_name:'none',
    company:"",
    job:"",
    render:"",
    gt_age:20,
    lt_age:60,
    edu:"",
  };
 
  componentDidMount() {
    this.fetch();
  }


  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    //此处api接口传入参数,列表数据顺序改变，第三次按页面恢复原序,因此执行的需要为同一函数
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });


  }

  fetch = (params = {}) => {
    console.log('params:', params);

    //loding图画显示
    this.setState({ loading: true });
    reqwest({
      url: 'api/es/getList.json',
      //url:"http://localhost:8080/resume/es/list.do",
      method: 'get',
      data: {
        ...params,
      },
      type: 'json',
    }).then((data) => {
    	console.log(data);
    	//...扩展运算符
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = data.msg.count;
     
      this.setState({
        loading: false,
        data: data.data,
        pagination,
      });
    });
  }

    handleType(value) {
      this.setState({
        type:value
      })
    }

   searchResume(value){
    this.setState({ loading: true });
        console.log(this.state.type)
        axios.post('http://localhost:8080/resume/es/list.do',{
          type: this.state.type,
          string:value,
        }).then((res)=> {
          const result = res.data;
    
          console.log(result);
           const pagination = { ...this.state.pagination };
          pagination.total = result.msg.count;
          this.setState({
            loading: false,
            data: result.data,
            pagination,
          });
        })  

   }
   display(){

    if (this.state.display_name == 'none') {
            this.setState({
                display_name: 'block',
            })
        }
        else if (this.state.display_name == 'block') {
            this.setState({
                display_name: 'none',
            })
 
        }
   }
   multipleSearch(){
    console.log(this.state.company);
    console.log(this.state.job);
    console.log(this.state.edu);
    console.log(this.state.gt_age);
    console.log(this.state.lt_age);
    axios.post("",{
      company:this.state.company,
      job:this.state.job,
      gt_age:this.state.gt_age,
      lt_age:this.state.lt_age,
      edu:this.state.edu,
    }).then((res)=>{

    })
   }
  handleCompany(e){
    console.log(e.target.value)
    this.setState({
      company:e.target.value
    })
  }
  handleJob(e){
    console.log(e.target.value)
    this.setState({
      job:e.target.value
    })
  }
  
  handleEdu(value){
    
    this.setState({
      edu:value
    })
  }
  handleRender(value){
   
    this.setState({
      render:value
    })
  }
  handleGt(e){
     console.log(e.target.value)
    this.setState({
      gt_age:e.target.value
    })
  }
  handleLt(e){
     console.log(e.target.value)
    this.setState({
      lt_age:e.target.value
    })
  }
  reSet(){
    this.setState({
      company:"",
      job:"",
      gt_age:1,
      lt_age:100,
    })
  }
  render() {
    return (
      <div >
            <div>
            <Row>
              <Col  span="3" >
              &emsp;&emsp;&emsp;
              <Select defaultValue="0" style={{ width: 100 }} onChange={value=>this.handleType(value)}>
                <Option value="0">全文检索</Option>
                <Option value="1">人名检索</Option>
               </Select>
              </Col>
              <Col span="7" >
              <Search 
                placeholder="input search text"
                onSearch={(value) => this.searchResume(value)}
                style={{ width: 200  }}
              />
              </Col>
               <Col span="14">
                <Button onClick={this.display.bind(this)}>精确查询<Icon type="edit" /></Button>
               </Col>
            </Row>
            &nbsp;
             <Row>
              <Col  span="2" />
              <Col  span="8" >
              
              <div style={{  display: this.state.display_name }}>    
                  <div style={{ align:"center"}}>
                  <Row><span>输入条件进行精确查询</span></Row>
                  &nbsp;
                  <Row><Col  span="5">公司名称：</Col><Col  span="10"> <Input value={this.state.company} style={{width:300,}} onChange={this.handleCompany.bind(this)}></Input></Col></Row>
                  <Row><Col  span="5">职位名称：</Col><Col  span="10"> <Input value={this.state.job} style={{width:300,}} onChange={this.handleJob.bind(this)}></Input></Col></Row>
                  <Row><Col  span="5">学历：</Col><Col  span="10">
                  <Select value={this.state.edu} defaultValue="不限" style={{ width: 100 }} onChange={value=>this.handleEdu(value)}>
                    <Option value="专科">专科</Option>
                    <Option value="本科">本科</Option>
                    <Option value="硕士">硕士</Option>
                    <Option value="博士">博士</Option>
                   </Select>
                   </Col></Row>
                   <Row><Col  span="5">性别：</Col><Col  span="10">
                  <Select value={this.state.render} defaultValue="0" style={{ width: 100 }} onChange={value=>this.handleRender(value)}>
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                    
                   </Select>
                   </Col></Row>
                  <Row><Col  span="5">年龄：</Col><Col  span="10"> <Input  value={this.state.gt_age} style={{width:50,}} onChange={this.handleGt.bind(this)}></Input>岁-
                            <Input  value={this.state.lt_age} style={{width:50,}} onChange={this.handleLt.bind(this)}></Input>岁
                            
                  </Col></Row>
                  <Row><Col  span="5"></Col><Col  span="10"><Button onClick={this.multipleSearch.bind(this)}>搜索</Button> &nbsp;<Button onClick={this.reSet.bind(this)}>重置</Button></Col></Row>
                  </div>

              </div>
              </Col>
             </Row>
            </div>
            
              <Table
                columns={columns}
                dataSource={this.state.data}
                pagination={this.state.pagination}
                loading={this.state.loading}
                onChange={this.handleTableChange}
                size="small"
              />
            
      </div>
    );
  }
}
