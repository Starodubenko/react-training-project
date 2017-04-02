import * as React from "react";
import {normalize, schema} from 'normalizr';
import {AddInputString, Category} from "../../../components";

import "./CategoryList.scss"
import {LinearProgress} from "material-ui";
import DataService from "../../../services/data.service";

export class CategoryList extends React.Component {

    constructor() {
        super();
        this.dataService =  DataService.getInstance();
        this.addCategoryTitle = this.addCategoryTitle.bind(this);
        this.addTodoItem = this.addTodoItem.bind(this);
        this.editTodoItem = this.editTodoItem.bind(this);

        this.newCategory = this.newCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);

        this.removeFromTree = this.removeFromTree.bind(this);
        this.createCategoryTree = this.createCategoryTree.bind(this);

        // let dataFromRest = [
        //     {
        //         id: 1,
        //         title: "Category #1",
        //         todoList: [
        //             {
        //                 id: 1,
        //                 title: "Todo title #1",
        //                 description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                 isDone: false
        //             },
        //             {
        //                 id: 2,
        //                 title: "Todo title #2",
        //                 description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                 isDone: false
        //             },
        //             {
        //                 id: 3,
        //                 title: "Todo title #3",
        //                 description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                 isDone: false
        //             },
        //         ],
        //         categories: [
        //             {
        //                 id: 2,
        //                 title: "Category #2",
        //                 todoList: [
        //                     {
        //                         id: 4,
        //                         title: "Todo title #4",
        //                         description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                         isDone: false
        //                     }
        //                 ],
        //                 categories: []
        //             },
        //             {
        //                 id: 3,
        //                 title: "Category #3",
        //                 todoList: [
        //                     {
        //                         id: 5,
        //                         title: "Todo title #5",
        //                         description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                         isDone: false
        //                     }
        //                 ],
        //                 categories: [
        //                     {
        //                         id: 4,
        //                         title: "Category #4",
        //                         todoList: [
        //                             {
        //                                 id: 6,
        //                                 title: "Todo title #6",
        //                                 description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                                 isDone: false
        //                             }
        //                         ],
        //                         categories: []
        //                     },
        //                 ]
        //             },
        //         ]
        //     },
        //     {
        //         id: 5,
        //         title: "Category #5",
        //         todoList: [
        //             {
        //                 id: 7,
        //                 title: "Todo title #7",
        //                 description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                 isDone: false
        //             },
        //             {
        //                 id: 8,
        //                 title: "Todo title #8",
        //                 description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                 isDone: false
        //             },
        //             {
        //                 id: 9,
        //                 title: "Todo title #9",
        //                 description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                 isDone: false
        //             },
        //         ],
        //         categories: [
        //             {
        //                 id: 6,
        //                 title: "Category #6",
        //                 todoList: [
        //                     {
        //                         id: 10,
        //                         title: "Todo title #10",
        //                         description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                         isDone: false
        //                     }
        //                 ],
        //                 categories: []
        //             },
        //             {
        //                 id: 7,
        //                 title: "Category #7",
        //                 todoList: [
        //                     {
        //                         id: 11,
        //                         title: "Todo title #11",
        //                         description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                         isDone: false
        //                     }
        //                 ],
        //                 categories: [
        //                     {
        //                         id: 8,
        //                         title: "Category #8",
        //                         todoList: [
        //                             {
        //                                 id: 12,
        //                                 title: "Todo title #12",
        //                                 description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
        //                                 isDone: false
        //                             }
        //                         ],
        //                         categories: []
        //                     },
        //                 ]
        //             },
        //         ]
        //     }
        // ];
        //
        // const todoSchema = new schema.Entity('todo');
        // const categorySchema = new schema.Entity('category');
        // categorySchema.define({
        //     todoList: [todoSchema],
        //     categories: [categorySchema]
        // });
        // const data = normalize(dataFromRest, [categorySchema]);
        const data = this.dataService.getData();
        this.state = {
            data: data,
            newCategoryPattern: {
                id: null,
                title: "",
                todoList: [],
                categories: []
            },
            newTodoItem: {
                id: null,
                title: "Todo title #1",
                description: "",
                isDone: false
            }
        }
    }

    addCategoryTitle(value, parentId) {
        let updatedData = this.state.data;
        let newCategory = Object.assign({},this.state.newCategoryPattern);
        newCategory.id = Math.round(Math.random()*10000);
        newCategory.title = value;
        updatedData.entities.category[newCategory.id] = newCategory;

        if (parentId){
            updatedData.entities.category[parentId].categories.push(newCategory.id);
        } else {
            updatedData.result.push(newCategory.id);
        }

        this.setState({data: updatedData});
        this.dataService.setData(updatedData);
    }

    addTodoItem(categoryId, text) {
        let newTodoItem = Object.assign({},this.state.newTodoItem);
        newTodoItem.id = Math.round(Math.random()*10000);
        newTodoItem.title = text;

        let updatedData = this.state.data;
        updatedData.entities.category[categoryId].todoList.push(newTodoItem.id);
        updatedData.entities.todo[newTodoItem.id] = newTodoItem;

        this.setState({data: updatedData});
    }

    editTodoItem(e) {
        e.stopPropagation();
        console.log("The item is being edited");
    }


    newCategory(e) {
        e.stopPropagation();
    }

    editCategory() {
        console.log("The category is being edited");
    }

    removeFromTree(parentId, id){
        let updatedData = this.state.data;
        if (parentId){
            let todoList = updatedData.entities.category[id].todoList;
            let children = updatedData.entities.category[parentId].categories;
            todoList.forEach((todoId) => {
                delete updatedData.entities.todo[todoId];
            });
            [...updatedData.entities.category[id].categories].forEach((childId) => {
                updatedData = this.removeFromTree(id, childId);
            });
            children.splice(children.indexOf(id), 1);
            delete updatedData.entities.category[id];
        } else {
            let todoList = updatedData.entities.category[id].todoList;
            todoList.forEach((todoId) => {
                delete updatedData.entities.todo[todoId];
            });
            [...updatedData.entities.category[id].categories].forEach((childId) => {
                updatedData = this.removeFromTree(id, childId);
            });
            updatedData.result.splice(updatedData.result.indexOf(id), 1);
            delete updatedData.entities.category[id];
        }
        return updatedData;
    }

    removeCategory(parentId, id, e) {
        e.stopPropagation();
        let result = this.removeFromTree(parentId, id);
        this.setState({data: result});
        this.dataService.setData(result);
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

        let todoActions = {
            addTodoItem: this.addTodoItem,
            editTodoItem: this.editTodoItem
        };

        let categoryList = this.createCategoryTree(serviceActions, this.state.data.result, null);

        let children = React.Children.map(this.props.children, function (child) {
            return React.cloneElement(child, {
                todoActions: todoActions
            })
        });

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
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}