import * as React from "react";
import {AddInputString, Category} from "../../components";

import "./TodoList.scss"
import {LinearProgress, Paper} from "material-ui";
import {TodoItem} from "../../components/common/TodoItem/TodoItem";

export class TodoList extends React.Component {

    constructor() {
        super();
        this.addCategoryTitle = this.addCategoryTitle.bind(this);
        this.addItem = this.addItem.bind(this);
        this.editItem = this.editItem.bind(this);

        this.newCategory = this.newCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);

        this.state = { data: [
            {
                id: 1,
                title: "Category #1",
                todoList: [
                    {
                        id: 1,
                        title: "Todo title #1",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        id: 2,
                        title: "Todo title #2",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        id: 3,
                        title: "Todo title #3",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                ],
                children: [
                    {
                        id: 2,
                        title: "Category #2",
                        todoList: [
                            {
                                id: 4,
                                title: "Todo title #4",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        children: []
                    },
                    {
                        id: 3,
                        title: "Category #3",
                        todoList: [
                            {
                                id: 5,
                                title: "Todo title #5",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        children: [
                            {
                                id: 4,
                                title: "Category #4",
                                todoList: [
                                    {
                                        id: 6,
                                        title: "Todo title #6",
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
                id: 5,
                title: "Category #5",
                todoList: [
                    {
                        id: 7,
                        title: "Todo title #7",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        id: 8,
                        title: "Todo title #8",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        id: 9,
                        title: "Todo title #9",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                ],
                children: [
                    {
                        id: 6,
                        title: "Category #6",
                        todoList: [
                            {
                                id: 10,
                                title: "Todo title #10",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        children: []
                    },
                    {
                        id: 7,
                        title: "Category #7",
                        todoList: [
                            {
                                id: 11,
                                title: "Todo title #11",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        children: [
                            {
                                id: 8,
                                title: "Category #8",
                                todoList: [
                                    {
                                        id: 12,
                                        title: "Todo title #12",
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
        ]}
    }

    addCategoryTitle() {
        console.log("The category have been added");
    }

    addItem() {
        console.log("The category have been added");
    }

    editItem() {
        console.log("The item is being edited");
    }


    newCategory() {
        console.log("A new category is creating");
    }

    editCategory() {
        console.log("The category is being edited");
    }

    removeCategory(pathIndexes) {
        let result = this.findAndDelete(this.state.data, pathIndexes);
        this.setState({data: result});
        console.log("The category have been removed");
    }

    findAndDelete(categories, pathIndexes) {
        let currentChild;
        if (pathIndexes.length === 1){
            categories.splice(pathIndexes[0],1)
        } else {
            pathIndexes.forEach((pathIndex,index)  => {
                if (currentChild){
                    if (index === pathIndexes.length - 1) {
                        currentChild.children.splice(pathIndex,1)
                    } else {
                        currentChild = currentChild.children[pathIndex];
                    }

                } else {
                    currentChild = categories[pathIndex];
                }
            });
        }
        return categories;
    }

    render() {

        let serviceActions = {
            newCategory: this.newCategory,
            editCategory: this.editCategory,
            removeCategory: this.removeCategory,
        };

        return (
            <div className="todo-list">
                <LinearProgress mode="determinate" color={"#37FF01"} style={{height: '15px', backgroundColor: 'white'}} value={50}/>
                <div className="content">
                    <div className="left">
                        <AddInputString hint={"Enter category title"} addEvent={this.addCategoryTitle}/>
                        <div className="category-list">
                            <Category serviceActions={serviceActions} data={this.state.data} />
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