import * as React from "react";
import {Checkbox, IconButton, Paper} from "material-ui";
import {EditorModeEdit} from "material-ui/svg-icons/index";

import "./TodoItem.scss"

export class TodoItem extends React.Component {

    constructor(){
        super();
    }

    render() {
        let {data, editEvent} = this.props;
        return (
            <Paper zDepth={1} children={
                <div className="todo-item">
                    <div className="title">
                        <Checkbox label={data.title}/>
                    </div>
                    <div className="actions">
                        <div className="edit">
                            <IconButton>
                                <EditorModeEdit onClick={editEvent}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            }/>
        )
    }
}