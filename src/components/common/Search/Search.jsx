import * as React from "react";
import {Checkbox, IconButton, TextField} from "material-ui";
import {EditorModeEdit, ActionSearch, ContentClear} from "material-ui/svg-icons/index";

import "./Search.scss"

export class Search extends React.Component {

    constructor() {
        super();
        this.clearSearchString = this.clearSearchString.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.markToShowDone = this.markToShowDone.bind(this);

        this.state = {
            filterString: "",
            isShownDoneItems: false
        }
    }

    clearSearchString() {
        delete this.props.location.query.filterString;
        this.setState({filterString: ""});
        this.props.onFilterChange();
    }

    onChangeHandler(e, newValue) {
        this.setState({filterString: newValue});
        if (newValue){
            this.props.location.query.filterString = newValue;
        } else {
            delete this.props.location.query.filterString;
        }
        this.props.router.push(this.props.location);
        this.props.onFilterChange();
    }

    markToShowDone(e) {
        this.setState({isShownDoneItems: e.target.checked});
        this.props.location.query.isShownDoneItems = e.target.checked;
        this.props.router.push(this.props.location);
        this.props.onFilterChange();
    }

    componentWillMount(){
        this.setState({
            filterString: this.props.location.query.filterString || "",
            isShownDoneItems: this.props.location.query.isShownDoneItems || false
        })
    }

    render() {
        let isShownDoneItems = typeof this.state.isShownDoneItems == "string" ?
            this.state.isShownDoneItems == "true" :
            this.state.isShownDoneItems;

        return (
            <div className="search">
                <div className="done-checkbox">
                    <Checkbox  label={"Show done"}
                               checked={isShownDoneItems}
                               onCheck={this.markToShowDone}
                               iconStyle={{fill:  '#ffffff'}}/>
                </div>
                <label htmlFor="search-field" className="search-field-label">
                    <ActionSearch/>
                </label>
                <TextField
                    id={"search-field"}
                    hintText={"start typing todo title"}
                    value={this.state.filterString}
                    onChange={this.onChangeHandler}
                />
                <div className="search-clean-button">
                    {this.state.filterString ?
                        <IconButton>
                            <ContentClear onClick={this.clearSearchString}/>
                        </IconButton>
                        : null}
                </div>
            </div>
        )
    }
}