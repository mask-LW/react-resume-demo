import React,{Component} from 'react';
import './style/common.less';
export  default class Robot extends Component {
	render() {
		return (
			<div >
				<ul class="chat-thread">
				<li>Are we meeting today?</li>
				<li>yes, what time suits you?</li>
				<li>I was thinking after lunch, I have a meeting in the morning</li>
			</ul>

			<form class="chat-window">
				<input class="chat-window-message" name="chat-window-message" type="text" autocomplete="off" autofocus />
			</form>
			</div>
		);
	}
} 