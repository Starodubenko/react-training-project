import * as React from "react";
import {AddInputString, TodoItem} from "../../../../components";
import {connect} from "react-redux";

import "./TodoList.scss";

@connect((store) => {
    return {

    }
})
export class TodoList extends React.Component {

    constructor() {
        super();
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
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

    componentWillMount(){
        this.setState({data: this.props.data});
    }

    render() {
        let {categoryId} = this.props.routeParams;
        let category = this.state.data.entities.category[categoryId];
        let todoList = category ? category.todoList.map((id)=> {
            if (this.props.data.entities.todo[id]){
                return <TodoItem {...this.props} key={id} data={this.state.data.entities.todo[id]} editItem={this.editItem}/>
            }
        }) : null;

        let editChildren = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                todos: this.state.data.entities.todo,
                previousLocation: this.props.router.getCurrentLocation(),
                editItem: this.editItem
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