import * as React from "react";
import {FlatButton, TextField} from "material-ui";
import {connect} from "react-redux";

import "./AddInputString.scss"
import {saveCategoryAction} from "../../../redux/actions/CategoryActions/CategoryActions";


@connect((store) => {
    return {

    }
})
export class AddInputString extends React.Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.onClickHandler = this.onClickHandler.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);

        this.state = {
            leftHorizontalAlign: {
                textAlign: "start"
            },
            rightHorizontalAlign: {
                textAlign: "end"
            },
            value: ""
        }
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.onClickHandler()
        }
    }

    onClickHandler() {
        if (this.state.value) {
            this.props.addEvent(this.state.value);
            this.setState({value: ""});
        }
    }

    render() {
        let {hint, isRightHorAlignment} = this.props;
        return (
            <div className="add-input-string"
                 style={isRightHorAlignment ? this.state.rightHorizontalAlign : this.state.leftHorizontalAlign}>
                <TextField onChange={ this.handleChange }
                           onKeyPress={ this.handleKeyPress }
                           hintText={hint}
                           value={this.state.value || ""}
                />
                <FlatButton label="Add" onClick={this.onClickHandler}/>
            </div>
        )
    }
}