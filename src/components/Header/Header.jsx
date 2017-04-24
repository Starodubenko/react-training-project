import * as React from "react";

import "./Header.scss"

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import {Search} from "../common/Search/Search";

export class Header extends React.Component {

    handleIconClick(){

    }

    render() {
        let {onFilterChange} = this.props;
        return (
            <div>
                <AppBar
                    title="To-Do List"
                    iconElementLeft={<IconButton onClick={this.handleIconClick.bind(this)}></IconButton>}
                    iconElementRight={<Search {...this.props} onFilterChange={onFilterChange}/>}
                />
            </div>
        );
    }
}