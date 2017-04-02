import React, {Component}from "react";
import {Router, Route, hashHistory, IndexRedirect} from "react-router";
import {NotFound, App, CategoryList, TodoList, TodoEdit} from "./containers";
import { syncHistoryWithStore } from 'react-router-redux';

export default class Routes extends Component{

    render(){
        const {store} = this.props;
        const history = syncHistoryWithStore(hashHistory, store);
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    {/*//TodoList*/}
                    <Route path="category-list" component={CategoryList}>
                        <Route {...this.props} path=":id" component={TodoList}>
                            {/*<Route path=":id" component={TodoView}/>*/}
                            <Route {...this.props} path=":id/edit" component={TodoEdit}/>
                        </Route>
                    </Route>
                    <IndexRedirect to="/category-list" />
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
};
