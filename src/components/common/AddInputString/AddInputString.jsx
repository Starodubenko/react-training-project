import * as React from "react";
import {FlatButton, TextField} from "material-ui";

import "./AddInputString.scss"

export class AddInputString extends React.Component {

    constructor(){
        super();

        this.state = {
            leftHorizontalAlign: {
                textAlign: "start"
            },
            rightHorizontalAlign: {
                textAlign: "end"
            }
        }
    }

    render() {
        let {hint, addEvent, isRightHorAlignment} = this.props;
        return (
            <div className="add-input-string" style={isRightHorAlignment ? this.state.rightHorizontalAlign : this.state.leftHorizontalAlign}>
                <TextField
                    hintText={hint}
                />
                <FlatButton label="Add" onClick={addEvent} />
            </div>
        )
    }
}