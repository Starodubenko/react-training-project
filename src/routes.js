import React, {Component}from "react";
import {Router, Route, hashHistory, IndexRedirect} from "react-router";
import {NotFound, App, TodoList, TodoEdit} from "./containers";
import { syncHistoryWithStore } from 'react-router-redux';

export default class Routes extends Component{

    render(){
        const {store} = this.props;
        const history = syncHistoryWithStore(hashHistory, store);
        return (
            <Router history={history}>
                <Route path="/" component={App}>
                    <Route path="todo-list" component={TodoList}>
                        <Route path=":id/edit" component={TodoEdit}/>
                    </Route>
                    <IndexRedirect to="/todo-list" />
                </Route>
                <Route path="*" component={NotFound}/>
            </Router>
        );
    }
};
