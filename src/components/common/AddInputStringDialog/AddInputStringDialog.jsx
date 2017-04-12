import * as React from "react";
import {Dialog, FlatButton, RaisedButton, TextField} from "material-ui";
import {connect} from "react-redux";

import "./AddInputStringDiaolg.scss"


@connect((store) => {
    return {
        user: store.auth.user
    }
})
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
            if (this.props.editEntity){
                this.props.editEvent(this.state.value, this.props.editEntity.id);
                this.props.toggleEvents.openEditDialog();
            } else {
                this.props.addEvent(this.state.value, this.props.parentId);
                this.props.toggleEvents.openAddDialog();
            }
            this.setState({value: ""});
        }
    }

    onClickHandler() {
        if (this.state.value) {
            if (this.props.editEntity){
                this.props.editEvent(this.state.value, this.props.editEntity.id);
                this.props.toggleEvents.openEditDialog();
            } else {
                this.props.addEvent(this.state.value, this.props.parentId);
                this.props.toggleEvents.openAddDialog();
            }
            this.setState({value: ""});
        }
    }

    onCancelHandler() {
        if (this.props.editEntity){
            this.props.toggleEvents.openEditDialog();
        } else {
            this.props.toggleEvents.openAddDialog();
        }
        this.setState({value: ""});
    }

    render() {
        let {editEntity, isOpened} = this.props;
        let modalActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.onCancelHandler}
            />,
            <FlatButton
                label={editEntity ? "Edit" : "Add"}
                primary={true}
                onTouchTap={this.onClickHandler}
            />,
        ];

        let dialogTitle = editEntity ? "Edit category" : "Add category";
        return (
            <div className="add-input-string-dialog">
                <Dialog
                    title={dialogTitle}
                    actions={modalActions}
                    modal={true}
                    open={isOpened}
                >
                    <TextField onChange={ this.handleChange }
                               onKeyPress={ this.handleKeyPress }
                               hintText={"Input category title"}
                               value={this.state.value || editEntity && editEntity.title || ""}
                    />
                </Dialog>
            </div>
        )
    }
}