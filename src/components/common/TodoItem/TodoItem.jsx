import * as React from "react";
import {Checkbox, IconButton, Paper} from "material-ui";
import {EditorModeEdit} from "material-ui/svg-icons/index";

import "./TodoItem.scss"

export class TodoItem extends React.Component {

    constructor(){
        super();
        this.goToEdit = this.goToEdit.bind(this);
    }

    goToEdit(e){
        e.stopPropagation();
        this.props.router.push("category-list/" + this.state.categoryId + "/edit/" + this.state.data.id);
    }

    componentWillMount(){
        let {categoryId} = this.props.params;
        let {data} = this.props;
        debugger;
        this.state = {
            categoryId: categoryId,
            data: data,
        };
    }

    render() {
        return (
            <Paper zDepth={1} children={
                <div className="todo-item">
                    <div className="title">
                        <Checkbox label={this.state.data.title}/>
                    </div>
                    <div className="actions">
                        <div className="edit">
                            <IconButton>
                                <EditorModeEdit onClick={this.goToEdit}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            }/>
        )
    }
}