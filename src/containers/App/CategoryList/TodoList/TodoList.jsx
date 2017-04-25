import * as React from "react";
import {AddInputString, TodoItem} from "../../../../components";
import {connect} from "react-redux";

import "./TodoList.scss";
import {saveTodoAction} from "../../../../redux/actions/TodoActions/TodoActions";
import {getFilteredTodoMap} from "../../../../redux/selectors/TodoSelector/TodoSelector";
import {getFilteredCategoryMap} from "../../../../redux/selectors/CategorySelector/CategorySelector";

@connect((store) => {
    return {
        filteredTodoMap: getFilteredTodoMap(store),
        filteredCategoryMap: getFilteredCategoryMap(store),
        todoBlank: store.category.get("todoBlank"),
    }
})
export class TodoList extends React.Component {

    constructor() {
        super();
        this.addItem = this.addItem.bind(this);
    }

    addItem(text) {
        let {categoryId} = this.props.routeParams;
        let newTodo = this.props.todoBlank;
        this.props.dispatch(saveTodoAction(categoryId, newTodo.set("title", text)));
    }

    componentWillMount(){
        this.setState({data: this.props.data});
    }

    render() {
        let {categoryId} = this.props.routeParams;
        let category = this.props.filteredCategoryMap.get("" + categoryId);
        let todoList = category ? category.get("todoList").map((id)=> {
            let todo = this.props.filteredTodoMap.get("" + id);
            if (todo){
                return <TodoItem {...this.props} key={id} data={todo} editItem={this.editItem}/>
            }
        }) : null;

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