import * as React from "react";
import {normalize, schema} from 'normalizr';
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

        this.removeFromTree = this.removeFromTree.bind(this);
        this.createCategoryTree = this.createCategoryTree.bind(this);

        let dataFromRest = [
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
                categories: [
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
                        categories: []
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
                        categories: [
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
                                categories: []
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
                categories: [
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
                        categories: []
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
                        categories: [
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
                                categories: []
                            },
                        ]
                    },
                ]
            }
        ];

        const todoSchema = new schema.Entity('todo');
        const categorySchema = new schema.Entity('category');
        categorySchema.define({
            todoList: [todoSchema],
            categories: [categorySchema]
        });
        const data = normalize(dataFromRest, [categorySchema]);
        this.state = {
            data: data,
            newCategoryPatern: {
                id: null,
                title: "",
                todoList: [],
                categories: []
            }
        }
    }

    addCategoryTitle(value, parentId) {
        let updatedData = this.state.data;
        let newCategory = Object.assign({},this.state.newCategoryPatern);
        newCategory.id = Math.round(Math.random()*10000);
        newCategory.title = value;
        updatedData.entities.category[newCategory.id] = newCategory;

        if (parentId){
            updatedData.entities.category[parentId].categories.push(newCategory.id);
        } else {
            updatedData.result.push(newCategory.id);
        }
        this.setState({data: updatedData});
    }

    addItem() {
        console.log("The category have been added");
    }

    editItem() {
        console.log("The item is being edited");
    }


    newCategory(parentId) {

    }

    editCategory() {
        console.log("The category is being edited");
    }

    removeFromTree(parentId, id){
        let updatedData = this.state.data;
        if (parentId){
            let children = updatedData.entities.category[parentId].categories;
            [...updatedData.entities.category[id].categories].forEach((childId) => {
                updatedData = this.removeFromTree(id, childId);
            });
            children.splice(children.indexOf(id), 1);
            delete updatedData.entities.category[id];
        } else {
            [...updatedData.entities.category[id].categories].forEach((childId) => {
                updatedData = this.removeFromTree(id, childId);
            });
            updatedData.result.splice(updatedData.result.indexOf(id), 1);
            delete updatedData.entities.category[id];
        }
        return updatedData;
    }

    removeCategory(parentId, id) {
        let result = this.removeFromTree(parentId, id);
        this.setState({data: result});
    }

    createCategoryTree(serviceActions, categoryIds, parentId) {
        let entities = this.state.data.entities;
        return categoryIds.map((id) => {
            return <Category key={id}
                             serviceActions={serviceActions}
                             categoryData={entities.category[id]}
                             parentId={parentId}
            />
        });
    }

    render() {

        let serviceActions = {
            newCategory: this.newCategory,
            editCategory: this.editCategory,
            removeCategory: this.removeCategory,
            createCategoryTree: this.createCategoryTree,
        };

        let categoryList = this.createCategoryTree(serviceActions, this.state.data.result, null);

        return (
            <div className="todo-list">
                <LinearProgress mode="determinate" color={"#37FF01"} style={{height: '15px', backgroundColor: 'white'}}
                                value={50}/>
                <div className="content">
                    <div className="left">
                        <AddInputString hint={"Enter category title"} addEvent={this.addCategoryTitle}/>
                        <div className="category-list">
                            {categoryList}
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