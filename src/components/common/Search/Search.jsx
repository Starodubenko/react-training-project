import * as React from "react";
import {IconButton, TextField} from "material-ui";
import {EditorModeEdit, ActionSearch, ContentClear} from "material-ui/svg-icons/index";

import "./Search.scss"

export class Search extends React.Component {

    constructor() {
        super();
        this.clearSearchString = this.clearSearchString.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.state = {
            searchRow: ""
        }
    }

    clearSearchString() {
        this.setState({searchRow: ""})
    }

    onChangeHandler(e, newValue) {
        this.setState({searchRow: newValue})
    }

    render() {
        // let {hint, addEvent, isRightHorAlignment} = this.props;
        return (
            <div className="search">
                <label htmlFor="search-field" className="search-field-label">
                    <ActionSearch/>
                </label>
                <TextField
                    id={"search-field"}
                    hintText={"start typing todo title"}
                    value={this.state.searchRow}
                    onChange={this.onChangeHandler}
                />
                <div className="search-clean-button">
                    {this.state.searchRow ?
                        <IconButton>
                            <ContentClear onClick={this.clearSearchString}/>
                        </IconButton>
                        : null}
                </div>
            </div>
        )
    }
}