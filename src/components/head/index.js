import React,{Component} from 'react';
import './index.less';
import {Row,Col} from 'antd';
export  default class Head extends Component {
	render() {
		return (
			<div className="head">
				<Row>
					<Col span="5">
						
						<div className="title"></div>
					</Col>
					<Col span="12"><div className="img" ></div></Col>
				</Row>
				
				
			</div>
		);
	}
} 