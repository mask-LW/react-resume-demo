import React,{Component} from 'react';
import {Row,Col} from 'antd';
import './index.less';

import Util from '../../util/util';
import axios from '../../axios';

export default class Header extends Component{
	state={}
	
	componentWillMount(){
		this.setState({
			userName:"mask_lw"
		})

		setInterval(() =>{
			let sysTime = Util.formateDate(new Date().getTime());
			this.setState({
				sysTime
			})
		},1000)
		this.getWeatherAPIData();
	}

	getWeatherAPIData(){
        let city = '北京';
        axios.jsonp({
            url:'http://api.map.baidu.com/telematics/v3/weather?location='+encodeURIComponent(city)+'&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then((res)=>{
            if(res.status === 'success'){
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl:data.dayPictureUrl,
                    weather:data.weather
                })
            }
        })
    }

	render (){
		return(
			<div className="header">
				<Row className="header-top">
					<Col span="24">
					{this.state.userName}
					<a href="#">退出</a>
					</Col>
				</Row>
				
			</div>
			)
		;
	}
}