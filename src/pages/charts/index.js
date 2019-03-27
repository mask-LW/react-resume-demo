import React,{Component} from 'react';


import {Card,Col,Row } from 'antd';

import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';
import echartsTheme from './echartTheme.js';

import ReactEcharts from 'echarts-for-react';

export default class AnalyzeChart extends Component{

	state = {
		man:{

		},
		women:{

		}
	}

	componentWillMount(){
		echarts.registerTheme('resume',echartsTheme);
	}

	getOption = () =>{
		let option = {
			title: { 
					text: '男性学历年龄层分布图',
					left: 'center',
			        top: 20,
			        textStyle: {
			            color: '#ccc'
			        }},
			tooltip:{
				trigger:'axis'
			},
			xAxis:{
				data:['20~30','30~40','40~50','50~60','60~70']
			},
			yAxis:{
				type: 'value'
			},
			series:{
				name: '数量',
				type: 'bar',
				data: [10,20,30,24,49]
			}
		}

		return option;
	}

	getOption2 = () =>{
		let option = {
			title: { 
					text: '女性学历年龄层分布图',
					left: 'center',
			        top: 20,
			        textStyle: {
			            color: '#ccc'
			        }},
			tooltip:{
				trigger:'axis'
			},
			xAxis:{
				data:['20~30','30~40','40~50','50~60','60~70']
			},
			yAxis:{
				type: 'value'
			},
			series:{
				name: '数量',
				type: 'bar',
				data: [10,20,30,24,49]
			}
		}

		return option;
	}
	getOption3 = () =>{
		let option = {
			title: {  text: '男性学历比例图',
			        left: 'center',
			        top: 20,
			        textStyle: {
			            color: '#ccc'
			        }},
			legend:{
				orient:'vertical',
				right:10,
				top:20,
				bottom:20,
				data:['专科','本科','硕士','博士']
			},
			 tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },

			series:{
				name: '数量',
				type: 'pie',
				radius : '55%',
           		center: ['50%', '50%'],
				data: [{
					value: 1000,
					name: '专科'
				},{
					value: 2000,
					name: '本科'
				},{
					value: 1500,
					name: '硕士'
				},{
					value: 1600,
					name: '博士'
				},].sort(function (a, b) { return a.value - b.value; }),
				roseType: 'radius',
				

			}
		}

		return option;
	}

	getOption4 = () =>{
		let option = {
			title: {  text: '男性学历比例图',
			        left: 'center',
			        top: 20,
			        textStyle: {
			            color: '#ccc'
			        }},
			legend:{
				orient:'vertical',
				right:10,
				top:20,
				bottom:20,
				data:['专科','本科','硕士','博士']
			},
			 tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },

			series:{
				name: '数量',
				type: 'pie',
				radius : '55%',
           		center: ['50%', '50%'],
				data: [{
					value: 1000,
					name: '专科'
				},{
					value: 2000,
					name: '本科'
				},{
					value: 1500,
					name: '硕士'
				},{
					value: 1600,
					name: '博士'
				},].sort(function (a, b) { return a.value - b.value; }),
				roseType: 'radius',
				

			}
		}
		
		return option;
	}

	render() {
		return (
			<div>
				<Card  style={{marginLeft:20,marginRight:25}}>
					<span>人才库分析</span>
				</Card>
				<Row style={{marginLeft:20}}>
					<Col span="12" >
					<Card title="" style={{width:500}}>
						<ReactEcharts 
						option={this.getOption()}
						 theme="resume"
						 style = {{height: 400,width:400}}
						 />
					</Card>
					</Col>
					<Col span="12" >
					<Card title="" style={{width:500}}>
						<ReactEcharts 
						option={this.getOption2()}
						 theme="resume"
						 style = {{height: 400,width:400}}
						 />
					</Card>
					</Col>
				</Row>
				<Row style={{marginLeft:20}}>
					<Col span="12" >
					<Card title="" style={{width:500}}>
						<ReactEcharts 
						 option={this.getOption3()}
						 theme="resume"
						 style = {{height: 400,width:400}}
						 />
					</Card>
					</Col>
					<Col span="12" >
					<Card title="" style={{width:500}}>
						<ReactEcharts 
						 option={this.getOption4()}
						 theme="resume"
						 style = {{height: 400,width:400}}
						 />

					</Card>
					</Col>
				</Row>
			</div>
		);
	}
}