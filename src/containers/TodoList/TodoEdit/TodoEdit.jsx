import * as React from "react";
import {LinearProgress, Paper} from "material-ui";
import {connect} from "react-redux";
import "./TodoEdit.scss"


@connect((store, ownProps) => {
    debugger;
    return {
        currentToDoId: ownProps.params.id
    }
})
export class TodoEdit extends React.Component {

    constructor() {
        super();
    }

    render() {

        return (
            <Paper className="todo-edit" zDepth={1} children={
                <label>
                    Todo edit {this.props.currentToDoId}
                </label>
            }/>
        )
    }
}