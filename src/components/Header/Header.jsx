import * as React from "react";
import {connect} from "react-redux";

import "./Header.scss";

import AppBar from "material-ui/AppBar";
import IconButton from "material-ui/IconButton";
import {routerActions} from "react-router-redux";
import {Search} from "../common/Search/Search";

@connect((store) => {
    return {
        categoryData: store.category.get("categoryData")
    }
})
export class Header extends React.Component {

    handleIconClick(){
        this.props.dispatch(routerActions.push({
            pathname: '/todo-list'
        }));
    }
    render() {
        let {onFilterChange} = this.props;
        return (
            <div>
                <AppBar
                    title="To-Do List"
                    iconElementLeft={this.props.categoryData ? <IconButton onClick={this.handleIconClick.bind(this)}></IconButton> : null}
                    iconElementRight={this.props.categoryData ? <Search onFilterChange={onFilterChange}/> : null}
                />
            </div>
        );
    }
}