import React, {Component}from "react";
import {Router, Route, hashHistory, IndexRedirect} from "react-router";
import {NotFound, App, CategoryList, TodoList, TodoEdit} from "./containers";

export default class Routes extends Component{

    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <Route path="category-list" component={CategoryList}>
                        <Route {...this.props} path=":categoryId" component={TodoList}>
                            <Route {...this.props} path="edit/:todoId" component={TodoEdit}/>
                        </Route>
                    </Route>
                    <IndexRedirect to="/category-list" />
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
};
