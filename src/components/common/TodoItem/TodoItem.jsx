import * as React from "react";
import {Checkbox, IconButton} from "material-ui";
import {EditorModeEdit} from "material-ui/svg-icons/index";

import "./TodoItem.scss"

export class TodoItem extends React.Component {

    constructor(){
        super();
    }

    render() {
        let {title, editEvent} = this.props;
        return (
            <div className="todo-item">
                <div className="title">
                    <Checkbox label={title}/>
                </div>
                <div className="actions">
                    <div className="edit">
                        <IconButton>
                            <EditorModeEdit onClick={editEvent}/>
                        </IconButton>
                    </div>
                </div>
            </div>
        )
    }
}