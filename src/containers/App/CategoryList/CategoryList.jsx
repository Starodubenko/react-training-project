import * as React from "react";
import {normalize, schema} from 'normalizr';
import {AddInputString, Category} from "../../../components";

import "./CategoryList.scss"
import {LinearProgress} from "material-ui";
import DataService from "../../../services/data.service";

export class CategoryList extends React.Component {

    constructor() {
        super();
        this.addCategoryTitle = this.addCategoryTitle.bind(this);
        this.addTodoItem = this.addTodoItem.bind(this);

        this.editCategory = this.editCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);

        this.removeFromTree = this.removeFromTree.bind(this);
        this.createCategoryTree = this.createCategoryTree.bind(this);
        this.calculateDonePercentage = this.calculateDonePercentage.bind(this);
    }

    addCategoryTitle(value, parentId) {
        let updatedData = this.state.data;
        let newCategory = Object.assign({}, this.state.newCategoryPattern);
        newCategory.id = Math.round(Math.random() * 10000);
        newCategory.title = value;
        updatedData.entities.category[newCategory.id] = newCategory;
        if (parentId) {
            updatedData.entities.category[parentId].categories.push(newCategory.id);
        } else {
            updatedData.result.push(newCategory.id);
        }

        this.state.setGlobalState(updatedData);
    }

    addTodoItem(updatedTodo, categoryId, text) {
        let updatedData = this.state.data;
        if (updatedTodo) {
            updatedData.entities.todo[updatedTodo.id] = updatedTodo;
        } else {
            let newTodoItem = Object.assign({}, this.state.newTodoItem);
            newTodoItem.id = Math.round(Math.random() * 10000);
            newTodoItem.title = text;

            updatedData.entities.category[categoryId].todoList.push(newTodoItem.id);
            updatedData.entities.todo[newTodoItem.id] = newTodoItem;
        }

        this.state.setGlobalState(updatedData);
    }

    editCategory(newTitle, categoryId) {
        let updatedData = this.state.data;
        updatedData.entities.category[categoryId].title = newTitle;
        this.state.setGlobalState(updatedData);
    }

    removeFromTree(parentId, id) {
        let updatedData = this.state.data;
        if (parentId) {
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
        let updatedData = this.removeFromTree(parentId, id);
        this.state.setGlobalState(updatedData);
    }

    createCategoryTree(serviceActions, categoryIds, parentId) {
        let entities = this.props.data.entities;
        return categoryIds.map((id) => {
            if (entities.category[id]){
                return <Category {...this.props} key={id}
                                 serviceActions={serviceActions}
                                 categoryData={entities.category[id]}
                                 parentId={parentId}
                />
            }
        });
    }

    calculateDonePercentage() {
        let todoCount = Object.keys(this.props.originalData.entities.todo).length;
        let doneTodoCount = 0;
        Object.keys(this.props.data.entities.todo).forEach((item) => {
            if (this.props.data.entities.todo[item].isDone === true) {
                doneTodoCount += 1
            }
        });
        return Math.round(100 * doneTodoCount / todoCount);
    }

    changeCategory() {
        return (todoId, from, to) => {
            let updatedData = this.state.data;
            let fromList = updatedData.entities.category[from].todoList;
            let toList = updatedData.entities.category[to].todoList;
            fromList.splice(fromList.indexOf(+todoId), 1);
            toList.push(+todoId);
            this.state.setGlobalState(updatedData);
        }
    }

    componentWillMount() {
        this.setState(
            {
                data: this.props.data,
                setGlobalState: this.props.setGlobalState,
                donePercentage: this.calculateDonePercentage(),
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
        );
    }

    render() {

        let serviceActions = {
            newCategory: this.newCategory,
            editCategory: this.editCategory,
            removeCategory: this.removeCategory,
            createCategoryTree: this.createCategoryTree,
            addCategoryTitle: this.addCategoryTitle,
            changeCategory: this.changeCategory()
        };

        let todoActions = {
            addTodoItem: this.addTodoItem,
            editTodoItem: this.editTodoItem
        };

        let categoryList = this.createCategoryTree(serviceActions, this.props.data.result, null);

        let children = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                data: this.props.data,
                todoActions: todoActions
            })
        });

        return (
            <div className="todo-list">
                <LinearProgress mode="determinate" color={"#37FF01"} style={{height: '15px', backgroundColor: 'white'}}
                                value={this.state.donePercentage}/>
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