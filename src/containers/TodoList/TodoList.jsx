import * as React from "react";
import {AddInputString, Category} from "../../components";

import "./TodoList.scss"
import {Paper} from "material-ui";
import {TodoItem} from "../../components/common/TodoItem/TodoItem";

export class TodoList extends React.Component {

    constructor() {
        super();
        this.addCategoryTitle.bind(this);
        this.editCategory.bind(this);
        this.removeCategory.bind(this);
        this.newCategory.bind(this);
        this.addItem.bind(this);
        this.editItem.bind(this);
    }

    addCategoryTitle() {
        console.log("The category have been added");
    }

    editCategory() {
        console.log("The category is being edited");
    }

    removeCategory() {
        console.log("The category have been removed");
    }

    newCategory() {
        console.log("A new category is creating");
    }

    addItem(){
        console.log("The category have been added");
    }

    editItem(){
        console.log("The item is being edited");
    }

    render() {
        return (
            <div className="todo-list">
                <div className="todo-progress">progress</div>
                <div className="content">
                    <div className="left">
                        <AddInputString hint={"Enter category title"} addEvent={this.addCategoryTitle}/>
                        <div className="category-list">
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                            <Paper zDepth={2} children={<Category title={"Category"} editEvent={this.editCategory} removeEvent={this.removeCategory} newEvent={this.newCategory} />}/>
                        </div>
                    </div>
                    <div className="right">
                        <AddInputString hint={"Enter item title"} addEvent={this.addItem} isRightHorAlignment={true}/>
                        <div className="item-list">
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                            <Paper zDepth={1} children={<TodoItem title={"To do item"} editEvent={this.editItem}/>}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}