import * as React from "react";
import {AddInputString, Category} from "../../../components";
import {LinearProgress} from "material-ui";
import {connect} from "react-redux";

import {getFilteredCategoryMap} from "../../../redux/selectors/CategorySelector/CategorySelector";
import {getResult} from "../../../redux/selectors/ResultSelector/ResultSelector";
import "./CategoryList.scss";
import {AddInputStringDialog} from "../../../components/common/AddInputStringDialog/AddInputStringDialog";
import {saveCategoryAction} from "../../../redux/actions/CategoryActions/CategoryActions";

@connect((store, props) => {
    return {
        filteredCategoryMap: getFilteredCategoryMap(store),
        processingCategory: store.category.get("processingCategory"),
        processingCategoryParentId: store.category.get("processingCategoryParentId"),
        categoryBlank: store.category.get("categoryBlank"),
        result: getResult(store)
    }
})
export class CategoryList extends React.Component {

    constructor(props) {
        super(props);

        this.addCategoryTitle = this.addCategoryTitle.bind(this);
        this.addTodoItem = this.addTodoItem.bind(this);

        this.editCategory = this.editCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);

        this.removeFromTree = this.removeFromTree.bind(this);
        this.createCategoryArray = this.createCategoryArray.bind(this);
        this.calculateDonePercentage = this.calculateDonePercentage.bind(this);
    }

    addCategoryTitle(title) {
        this.props.dispatch(saveCategoryAction(null, this.props.categoryBlank.set("title", title)));
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

    createCategoryArray(categoryIds) {
        let self = this;
        return categoryIds.reduce((collector, id) => {
            let category = self.props.filteredCategoryMap.get(id) || self.props.filteredCategoryMap.get("" + id);
            if (category) {
                collector.push(<Category {...self.props} key={id} category={category} createCategoryArray={self.createCategoryArray}/>)
            }
            return collector;
        }, []);
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

    render() {
        let categoryList = this.createCategoryArray(this.props.result);

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
                        {this.props.children}
                    </div>
                </div>
                <AddInputStringDialog entity={this.props.processingCategory} parentId={this.props.processingCategoryParentId}/>
            </div>
        )
    }
}