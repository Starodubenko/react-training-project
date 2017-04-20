import * as React from "react";
import {Dialog, FlatButton, RaisedButton, TextField} from "material-ui";
import {connect} from "react-redux";

import "./AddInputStringDiaolg.scss"
import {freeCategoryProcessorAction, saveCategoryAction} from "../../../redux/actions/CategoryActions/CategoryActions";


@connect((store) => {
    return {

    }
})
export class AddInputStringDialog extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            entity: null,
            parentId: null,
            isEditEntity: false
        }
    }

    handleChange(e) {
        let entity = this.state.entity;
        this.setState({entity: entity.set("title", e.target.value)});
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.onClickHandler();
        }
    }

    onClickHandler() {
        if (this.props.entity.get("title") !== this.state.entity.get("title")) {
            this.props.dispatch(saveCategoryAction(this.state.parentId, this.state.entity));
            this.setState({
                entity: null,
                parentId: null,
                isEditEntity: false
            });
        }
    }

    onCancelHandler() {
        this.props.dispatch(freeCategoryProcessorAction());
        this.setState({
            entity: null,
            parentId: null,
            isEditEntity: false
        });
    }

    componentWillReceiveProps(nextProps){
        let {entity, parentId} = nextProps;
        this.setState({
            entity: entity,
            parentId: parentId,
            isEditEntity: entity ? entity.get("id") : false
        })
    }

    render() {
        let modalActions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.onCancelHandler}
            />,
            <FlatButton
                label={this.state.isEditEntity ? "Edit" : "Add"}
                primary={true}
                onTouchTap={this.onClickHandler}
            />,
        ];

        let dialogTitle = this.state.isEditEntity ? "Edit category" : "Add category";
        return (
            <div className="add-input-string-dialog">
                <Dialog
                    title={dialogTitle}
                    actions={modalActions}
                    modal={true}
                    open={!!this.state.entity}
                >
                    <TextField onChange={ this.handleChange }
                               onKeyPress={ this.handleKeyPress }
                               hintText={"Input category title"}
                               value={this.state.entity && this.state.entity.get("title") || ""}
                    />
                </Dialog>
            </div>
        )
    }
}