import React,{Component} from 'react';
import {HashRouter,Route,Switch} from 'react-router-dom';
import APP from './App';
import User from './User';
import Buttons from './pages/ui/buttons.js';
import Modals from './pages/ui/modals.js';
import Loadings from './pages/ui/loadings.js';
import Notification from './pages/ui/notice.js';
import NotMatch from './pages/notmatch'
import City from './pages/city/index.js';
import Upload from './pages/upload/index.js';
import AnalyzeChart from './pages/charts/index.js';

export default class IRouter extends Component{
    render() {
        return (
            <HashRouter>
                <APP>
                    <Route path="/user" 
                        render ={() =>
                            <User>
                                 <Route path="/user/home"></Route>
                                 <Route path="/user/ui/buttons" component={Buttons}></Route>
                                 <Route path="/user/ui/modals" component={Modals}></Route>
                                 <Route path="/user/ui/loadings" component={Loadings}></Route>
                                 <Route path="/user/ui/notification" component={Notification}></Route>
                                 <Route path="/user/list" component={City}></Route>
                                 <Route path="/user/upload" component={Upload}></Route>
                                 <Route path="/user/charts" component={AnalyzeChart}></Route>
                                 
                            </User>
                        }
                    ></Route>



                </APP>
            </HashRouter>
        );
    }
}
