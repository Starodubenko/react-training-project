import * as React from "react";
import {Checkbox, CircularProgress, FlatButton, LinearProgress, Paper, TextField} from "material-ui";
import {connect} from "react-redux";

import "./TodoEdit.scss"
import {getFilteredTodoMap, getTodoMap} from "../../../../../redux/selectors/TodoSelector/TodoSelector";
import {saveTodoAction, startTodoProcessingAction} from "../../../../../redux/actions/TodoActions/TodoActions";
import {push, goBack} from "react-router-redux"

@connect((store) => {
    debugger;
    return {
        filteredTodoMap: getFilteredTodoMap(store),
        isTodoProcessing: store.category.get("isTodoProcessing"),
    }
})
export class TodoEdit extends React.Component {

    constructor() {
        super();

        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.navigateBackTodoList = this.navigateBackTodoList.bind(this);
        this.onSaveHandler = this.onSaveHandler.bind(this);

        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onDoneChange = this.onDoneChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
    }

    onCancelHandler() {
        this.props.dispatch(goBack());
    }

    navigateBackTodoList() {
        this.props.dispatch(push({ pathname: "category-list/" + this.props.params.categoryId}));
    }

    onSaveHandler() {
        this.props.dispatch(startTodoProcessingAction());
        this.props.dispatch(saveTodoAction(null, this.state.todoData, "category-list/" + this.props.params.categoryId));
    }

    onTitleChange(e) {
        this.setState({todoData: this.state.todoData.set("title", e.target.value)});
    }

    onDescriptionChange(e) {
        this.setState({todoData: this.state.todoData.set("description", e.target.value)});
    }

    onDoneChange(e) {
        this.setState({todoData: this.state.todoData.set("isDone", e.target.checked)});
    }

    componentWillMount(){
        let {todoId} = this.props.routeParams;
        let todoData = this.props.filteredTodoMap.get(todoId);
        if (todoData.get("isDone")){
            this.navigateBackTodoList();
        }
        this.state = {
            todoData: todoData,
        };
    }

    render() {
        return (
            <Paper className="todo-edit" zDepth={1} children={
                !this.props.isTodoProcessing ?
                <div>
                    <div className="actions">
                        <FlatButton label="Back to todo list" onClick={this.navigateBackTodoList}/>
                        <div>
                            <FlatButton label="Save" onClick={this.onSaveHandler}/>
                            <FlatButton label="Cancel" onClick={this.onCancelHandler}/>
                        </div>
                    </div>
                    <TextField hintText={"Title"}
                               onChange={this.onTitleChange}
                               value={this.state.todoData.get("title")}
                    />
                    <Checkbox label={"is done"}
                              onCheck={this.onDoneChange}
                              checked={this.state.todoData.get("isDone")}/>
                    <TextField hintText={"Description"}
                               onChange={this.onDescriptionChange}
                               value={this.state.todoData.get("description")}
                               multiLine={true}
                               rowsMax={20}
                               style={{'width': '100%'}}
                    />
                </div> :
                <div className="spinner-container">
                    <CircularProgress size={80} thickness={2}/>
                </div>
            }/>
        )
    }
}