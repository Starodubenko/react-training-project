import * as React from "react";
import {AddInputString, TodoItem} from "../../../../components";

import "./TodoList.scss"
import DataService from "../../../../services/data.service";

export class TodoList extends React.Component {

    constructor() {
        super();
        this.dataService =  DataService.getInstance();
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);

        const data = this.dataService.getData();
        this.state = {
            data: data,
        }
    }

    addItem(text) {
        let {categoryId} = this.props.routeParams;
        let {addTodoItem} =this.props.todoActions;
        addTodoItem(null, categoryId, text);
    }

    editItem(updatedTodo) {
        let {addTodoItem} = this.props.todoActions;
        addTodoItem(updatedTodo);
        console.log("The item is being edited");
    }

    render() {
        let self = this;
        let {categoryId} = this.props.routeParams;
        let category = this.state.data.entities.category[categoryId];
        let todoList = category ? category.todoList.map((id)=> {
            return <TodoItem {...this.props} key={id} data={this.state.data.entities.todo[id]}/>
        }) : null;

        let editChildren = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {
                todos: self.state.data.entities.todo,
                previousLocation: self.props.router.getCurrentLocation(),
                editItem: self.editItem
            })
        });

        return (
            <div className="todo-list">
                <AddInputString hint={"Enter item title"} addEvent={this.addItem} isRightHorAlignment={true}/>
                <div className="item-list">
                    {todoList}
                </div>
                {editChildren}
            </div>
        )
    }
}