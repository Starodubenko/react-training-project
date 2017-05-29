import React, {Component}from "react";
import {Router, Route, hashHistory, IndexRedirect} from "react-router";
import {NotFound, App, CategoryList, TodoList, TodoEdit, TestAnimation} from "./containers";
import { syncHistoryWithStore } from 'react-router-redux';
import * as analyticsService from "react/lib/ReactDOMFactories";

export default class Routes extends Component{

    render(){
        const {store} = this.props;
        const history = syncHistoryWithStore(hashHistory, store);
        history.listen(location => analyticsService.track(location.pathname));
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    <Route path="category-list" component={CategoryList}>
                        <Route path=":categoryId" component={TodoList}>
                            <Route path="edit/:todoId" component={TodoEdit}/>
                        </Route>
                    </Route>
                    <Route path="test-animation" component={TestAnimation}/>
                    <IndexRedirect to="/category-list" />
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
};
