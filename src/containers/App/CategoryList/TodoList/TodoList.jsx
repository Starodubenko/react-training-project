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
        let {id} = this.props.routeParams;
        let {addTodoItem} =this.props.todoActions;
        addTodoItem(id, text);
    }

    editItem() {
        console.log("The item is being edited");
    }

    render() {
        let {id} = this.props.routeParams;
        let category = this.state.data.entities.category[id];
        let todoList = category ? category.todoList.map((todoId)=> {
            return <TodoItem key={todoId} data={this.state.data.entities.todo[todoId]} />
        }) : null;

        // let children = React.Children.map(this.props.children, function (child) {
        //     return React.cloneElement(child, {
        //         foo: this.state.foo
        //     })
        // });

        return (
            <div className="todo-list">
                <AddInputString hint={"Enter item title"} addEvent={this.addItem} isRightHorAlignment={true}/>
                <div className="item-list">
                    {todoList}
                </div>
                {this.props.children}
            </div>
        )
    }
}