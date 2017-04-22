import * as React from "react";
import {Checkbox, IconButton, Paper} from "material-ui";
import {EditorModeEdit} from "material-ui/svg-icons/index";
import {connect} from "react-redux";
import {toggleTodoDoneStatusAction} from "../../../redux/actions/TodoActions/TodoActions.jsx"

import "./TodoItem.scss"

@connect((store) => {
    return {
        router: store.router,
        categoryData: store.category.get("categoryData"),
    }
})
export class TodoItem extends React.Component {

    constructor(props){
        super(props);
        let {categoryId} = this.props.params;
        let {data} = this.props;
        this.state = {
            categoryId: categoryId,
            todo: data,
        };

        this.goToEdit = this.goToEdit.bind(this);
        this.markTodoAsDone = this.markTodoAsDone.bind(this);
    }

    goToEdit(e){
        e.stopPropagation();
        this.props.router.push("category-list/" + this.state.categoryId + "/edit/" + this.state.data.get("id"));
    }

    markTodoAsDone(e){
        this.props.dispatch(toggleTodoDoneStatusAction(this.state.todo.get("id")));
    }

    componentWillReceiveProps(){
        let {categoryId} = this.props.params;
        let {data} = this.props;
        this.state = {
            categoryId: categoryId,
            todo: data,
        };
    }

    render() {
        return (
            <Paper zDepth={1} children={
                <div className="todo-item">
                    <div className="title">
                        <Checkbox label={this.state.todo.get("title")} checked={this.state.todo.get("isDone")} onCheck={this.markTodoAsDone}/>
                    </div>
                    <div className="actions">
                        <div className="edit">
                            <IconButton disabled={this.state.todo.get("isDone")}>
                                <EditorModeEdit onClick={this.goToEdit}/>
                            </IconButton>
                        </div>
                    </div>
                </div>
            }/>
        )
    }
}