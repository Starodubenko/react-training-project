import * as React from "react";
import {connect} from "react-redux";

import "./Header.scss"

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import {routerActions} from "react-router-redux";
import {Search} from "../common/Search/Search";

@connect((store) => {
    return {
        user: store.auth.user
    }
})
export class Header extends React.Component {

    handleIconClick(){
        this.props.dispatch(routerActions.push({
            pathname: '/todo-list'
        }));
    }
    render() {
        return (
            <div>
                <AppBar
                    title="To-Do List"
                    iconElementLeft={<IconButton onClick={this.handleIconClick.bind(this)}></IconButton>}
                    iconElementRight={<Search />}
                />
            </div>
        );
    }
}