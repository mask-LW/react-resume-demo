import React,{Component} from 'react';

export default class  Robot extends React.Component{
	state = {
      meg: '',
      respon: [],
      megArray: []
    }
	     handleData(e) {
	    this.setState({
	      meg: e.target.value
	    })
	  }
    sendMessage() {
    var message = this.state.meg
    if(message === ''){
      alert('不能发送空白消息哦')
    }else{
          this.setState({
      megArray: [...this.state.megArray, message]
    })
    //锁定当前环境
    var that = this
    //使用fetch工具
    var func = fetch('http://www.tuling123.com/openapi/api?key=f0d11b6cae4647b2bd810a6a3df2136f&info=' + message, {
      method: 'POST',
      type: 'cors'
    }).then(function(response) {
      return response.json()
    }).then(function(detail) {
      return (that.setState({
        respon: [...that.state.respon, detail.text]
      }))
    })
    this.state.meg = ''
    }
  }
    render() {

    var meg = this.state.meg
    var megArray = this.state.megArray
    var respon = this.state.respon

    return (
      <div className="content">
        <div className="msg-list" ref="msgList">
          {megArray.map((elem,index) => (
            <div className="container" key={index}>
              <div className="message">{elem}</div>
              <div className="response">{respon[index]}</div>
            </div>)
           )}
        </div>
         <div className="fixedBottom">
           <input className="input" value={meg} onChange={this.handleData.bind(this)} />
           <button className="button" onClick={this.sendMessage.bind(this)}>发送</button>
         </div>
      </div>
    )
  }
}