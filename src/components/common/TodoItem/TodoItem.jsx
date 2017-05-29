import * as React from "react";
import {Checkbox, CircularProgress, IconButton, LinearProgress, Paper, RefreshIndicator} from "material-ui";
import {EditorModeEdit} from "material-ui/svg-icons/index";
import {connect} from "react-redux";
import {toggleTodoDoneStatusAction} from "../../../redux/actions/TodoActions/TodoActions.jsx";
import {push} from "react-router-redux";

import "./TodoItem.scss"

@connect((store) => {
    return {
        routing: store.routing,
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
            isDoneToggling: false
        };

        this.goToEdit = this.goToEdit.bind(this);
        this.markTodoAsDone = this.markTodoAsDone.bind(this);
    }

    goToEdit(e){
        e.stopPropagation();
        this.props.dispatch(push({ pathname: "category-list/" + this.state.categoryId + "/edit/" + this.state.todo.get("id")}));
    }

    markTodoAsDone(e){
        let currentStatus = this.state.todo.get("isDone");
        this.setState({todo: this.state.todo.set("isDone", !currentStatus), isDoneToggling: true});
        this.props.dispatch(toggleTodoDoneStatusAction(this.state.todo.get("id")));
    }

    componentWillReceiveProps(nextProps){
        this.setState({isDoneToggling: false, todo: nextProps.data})
    }

    render() {
        return (
            <Paper className="todo-item-wrapper" zDepth={1} children={
                <div className="todo-item">
                    <div className="title">
                        {this.state.isDoneToggling ? <CircularProgress size={40} thickness={1}/> :
                        <Checkbox label={this.state.todo.get("title")} checked={this.state.todo.get("isDone")} onCheck={this.markTodoAsDone}/>}
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