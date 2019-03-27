import { Input,Divider,Tooltip,Button } from 'antd';
import React from 'react';
const Search = Input.Search;

export default class SearchApp extends React.Component {
  render(){
    return (
          <div>
             <Tooltip placement="topLeft" >
                <Button>全文检索</Button>
              </Tooltip>
             
            <Search 
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200  }}
            />
      </div>
      );
  }
}