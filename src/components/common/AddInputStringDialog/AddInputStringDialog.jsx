import * as React from "react";
import {Dialog, FlatButton, RaisedButton, TextField} from "material-ui";

import "./AddInputStringDiaolg.scss"

export class AddInputStringDialog extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            value: ""
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleKeyPress(e) {
        if (e.key === 'Enter' && this.state.value) {
            this.props.addEvent(e.target.value, this.props.parentId);
            this.props.visibilityTrigger()
        }
    }

    onClickHandler() {
        if (this.state.value) {
            this.props.addEvent(this.state.value, this.props.parentId);
            this.props.visibilityTrigger()
        }
    }

    onCancelHandler() {
        this.props.visibilityTrigger()
    }

    render() {
        let {hint, isOpened} = this.props;
        let modalActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.onCancelHandler}
            />,
            <FlatButton
                label="Add"
                primary={true}
                onTouchTap={this.onClickHandler}
            />,
        ];
        return (
            <div className="add-input-string-dialog">
                <Dialog
                    title={""}
                    actions={modalActions}
                    modal={true}
                    open={isOpened}
                >
                    <TextField onChange={ this.handleChange }
                               onKeyPress={ this.handleKeyPress }
                               hintText={hint}
                               value={this.state.value || ""}
                    />
                </Dialog>
            </div>
        )
    }
}