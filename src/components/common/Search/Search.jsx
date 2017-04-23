import * as React from "react";
import {Checkbox, IconButton, TextField} from "material-ui";
import {ActionSearch, ContentClear} from "material-ui/svg-icons/index";
import {connect} from "react-redux";

import "./Search.scss"
import {getFilter} from "../../../redux/selectors/FilterSelector/FilterSelector";
import {
    cleanFilterStringAction, setDoneCheckBoxAction,
    setFilterStringAction
} from "../../../redux/actions/FilterActions/FilterActions";

@connect((store) => {
    return {
        filter: store.filter
    }
})
export class Search extends React.Component {

    constructor(props) {
        super(props);
        this.clearSearchString = this.clearSearchString.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.markToShowDone = this.markToShowDone.bind(this);

        this.state = {
            filterString: this.props.location && this.props.location.query.filterString || props.filter.get("filterString"),
            isShownDoneItems: this.props.location && this.props.location.query.isShownDoneItems || props.filter.get("isShownDoneItems")
        }
    }

    clearSearchString() {
        // delete this.props.location.query.filterString;
        this.setState({filterString: ""});
        this.props.dispatch(cleanFilterStringAction())
    }

    onChangeHandler(e, newValue) {
        this.setState({filterString: newValue});
        // if (newValue){
        //     this.props.location.query.filterString = newValue;
        // } else {
        //     delete this.props.location.query.filterString;
        // }
        // this.props.router.push(this.props.location);

        this.props.dispatch(setFilterStringAction(newValue))
    }

    markToShowDone(e) {
        this.setState({isShownDoneItems: e.target.checked});
        // this.props.location.query.isShownDoneItems = e.target.checked;
        // this.props.router.push(this.props.location);
        this.props.dispatch(setDoneCheckBoxAction(e.target.checked))
    }

    render() {

        return (
            <div className="search">
                <div className="done-checkbox">
                    <Checkbox  label={"Show done"}
                               checked={this.state.isShownDoneItems}
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