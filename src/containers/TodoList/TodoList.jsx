import * as React from "react";
import {AddInputString, Category} from "../../components";

import "./TodoList.scss"
import {LinearProgress, Paper} from "material-ui";
import {TodoItem} from "../../components/common/TodoItem/TodoItem";

export class TodoList extends React.Component {

    constructor() {
        super();
        this.addCategoryTitle = this.addCategoryTitle.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
        this.newCategory = this.newCategory.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.createCategoryTree = this.createCategoryTree.bind(this);
    }

    addCategoryTitle() {
        console.log("The category have been added");
    }

    editCategory(category) {
        console.log("The category is being edited");
    }

    removeCategory(category) {
        console.log("The category have been removed");
    }

    newCategory() {
        console.log("A new category is creating");
    }

    addItem() {
        console.log("The category have been added");
    }

    editItem() {
        console.log("The item is being edited");
    }

    createCategoryTree(data, editCategory, removeCategory, newCategory, createCategoryTree) {
        let result = [];
        data.forEach((category, index) => {
            result.push(
                <Category key={index}
                          data={category}
                          editEvent={editCategory}
                          removeEvent={removeCategory}
                          newEvent={newCategory}
                          createCategoryTree={createCategoryTree}/>
            )
        });
        return result;
    }

    render() {

        let data = [
            {
                title: "Category #1",
                todoList: [
                    {
                        title: "Todo title #1",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        title: "Todo title #2",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        title: "Todo title #3",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                ],
                children: [
                    {
                        title: "Category #11",
                        todoList: [
                            {
                                title: "Todo title #11",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        children: []
                    },
                    {
                        title: "Category #11",
                        todoList: [
                            {
                                title: "Todo title #11",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        children: [
                            {
                                title: "Category #11",
                                todoList: [
                                    {
                                        title: "Todo title #11",
                                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                        isDone: false
                                    }
                                ],
                                children: []
                            },
                        ]
                    },
                ]
            },
            {
                title: "Category #1",
                todoList: [
                    {
                        title: "Todo title #1",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        title: "Todo title #2",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        title: "Todo title #3",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                ],
                children: [
                    {
                        title: "Category #11",
                        todoList: [
                            {
                                title: "Todo title #11",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        children: []
                    },
                    {
                        title: "Category #11",
                        todoList: [
                            {
                                title: "Todo title #11",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        children: [
                            {
                                title: "Category #11",
                                todoList: [
                                    {
                                        title: "Todo title #11",
                                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                        isDone: false
                                    }
                                ],
                                children: []
                            },
                        ]
                    },
                ]
            }
        ];

        let categories = this.createCategoryTree(data, this.editCategory, this.removeCategory, this.newCategory, this.createCategoryTree);

        return (
            <div className="todo-list">
                <LinearProgress mode="determinate" color={"#37FF01"} style={{height: '15px', backgroundColor: 'white'}}
                                value={50}/>
                <div className="content">
                    <div className="left">
                        <AddInputString hint={"Enter category title"} addEvent={this.addCategoryTitle}/>
                        <div className="category-list">
                            {categories}
                        </div>
                    </div>
                    <div className="right">
                        <AddInputString hint={"Enter item title"} addEvent={this.addItem} isRightHorAlignment={true}/>
                        <div className="item-list">
                            <TodoItem title={"To do item"} editEvent={this.editItem}/>
                            <TodoItem title={"To do item"} editEvent={this.editItem}/>
                            <TodoItem title={"To do item"} editEvent={this.editItem}/>
                            <TodoItem title={"To do item"} editEvent={this.editItem}/>
                            <TodoItem title={"To do item"} editEvent={this.editItem}/>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}