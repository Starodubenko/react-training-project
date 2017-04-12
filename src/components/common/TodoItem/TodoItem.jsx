import * as React from "react";
import {Checkbox, IconButton, Paper} from "material-ui";
import {EditorModeEdit} from "material-ui/svg-icons/index";
import {connect} from "react-redux";

import "./TodoItem.scss"

@connect((store) => {
    return {
        user: store.auth.user
    }
})
export class TodoItem extends React.Component {

    constructor(){
        super();
        this.goToEdit = this.goToEdit.bind(this);
        this.markTodoAsDone = this.markTodoAsDone.bind(this);
    }

    goToEdit(e){
        e.stopPropagation();
        this.props.router.push("category-list/" + this.state.categoryId + "/edit/" + this.state.data.id);
    }

    markTodoAsDone(e){
        let updatedTodoItem = this.state.data;
        updatedTodoItem.isDone = e.target.checked;
        this.props.editItem(updatedTodoItem);
        this.setState({data: updatedTodoItem});
    }

    componentWillMount(){
        let {categoryId} = this.props.params;
        let {data} = this.props;
        this.state = {
            categoryId: categoryId,
            data: data,
        };
    }

    componentWillReceiveProps(){
        let {categoryId} = this.props.params;
        let {data} = this.props;
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
                        <Checkbox label={this.state.data.title} checked={this.state.data.isDone} onCheck={this.markTodoAsDone}/>
                    </div>
                    <div className="actions">
                        <div className="edit">
                            <IconButton disabled={this.state.data.isDone}>
                                <EditorModeEdit onClick={this.goToEdit}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            }/>
        )
    }
}