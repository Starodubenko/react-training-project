import * as React from "react";
import {Checkbox, FlatButton, LinearProgress, Paper, TextField} from "material-ui";
import {connect} from "react-redux";

import "./TodoEdit.scss"

@connect((store) => {
    return {

    }
})
export class TodoEdit extends React.Component {

    constructor() {
        super();

        this.state = {
            title: "",
            isDone: false,
            description: "",
        };

        this.onCancelHandler = this.onCancelHandler.bind(this);
        this.navigateBackTodoList = this.navigateBackTodoList.bind(this);
        this.onSaveHandler = this.onSaveHandler.bind(this);

        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onDoneChange = this.onDoneChange.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
    }

    onCancelHandler() {
        this.props.router.goBack();
    }

    navigateBackTodoList() {
        this.props.router.push("category-list/" + this.props.params.categoryId);
    }

    onSaveHandler() {
        this.props.editItem(this.state);
    }

    onTitleChange(e) {
        this.setState({title: e.target.value});
    }

    onDescriptionChange(e) {
        this.setState({description: e.target.value});
    }

    onDoneChange(e) {
        this.setState({isDone: e.target.checked});
    }

    componentWillMount(){
        let {todoId} = this.props.routeParams;
        let {todos} = this.props;
        let todoData = todos[todoId];
        if (todoData.isDone){
            this.navigateBackTodoList();
        }
        this.state = {
            id: todoData.id,
            title: todoData.title,
            isDone: todoData.isDone,
            description: todoData.description,
        };
    }

    render() {
        return (
            <Paper className="todo-edit" zDepth={1} children={
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
                               value={this.state.title}
                    />
                    <Checkbox label={"is done"}
                              onCheck={this.onDoneChange}
                              checked={this.state.isDone}/>
                    <TextField hintText={"Description"}
                               onChange={this.onDescriptionChange}
                               value={this.state.description}
                               multiLine={true}
                               rowsMax={20}
                               style={{'width': '100%'}}
                    />
                </div>
            }/>
        )
    }
}