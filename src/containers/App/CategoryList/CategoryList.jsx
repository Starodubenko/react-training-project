import * as React from "react";
import {AddInputString, Category} from "../../../components";
import {LinearProgress} from "material-ui";
import {connect} from "react-redux";

import {getFilteredCategoryMap} from "../../../redux/selectors/CategorySelector/CategorySelector";
import {getResult} from "../../../redux/selectors/ResultSelector/ResultSelector";
import "./CategoryList.scss";
import {AddInputStringDialog} from "../../../components/common/AddInputStringDialog/AddInputStringDialog";
import {saveCategoryAction} from "../../../redux/actions/CategoryActions/CategoryActions";
import {getTodoMap} from "../../../redux/selectors/TodoSelector/TodoSelector";

@connect((store, props) => {
    return {
        filteredCategoryMap: getFilteredCategoryMap(store),
        getTodoMap: getTodoMap(store),
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
        this.createCategoryArray = this.createCategoryArray.bind(this);
        this.calculateDonePercentage = this.calculateDonePercentage.bind(this);
    }

    addCategoryTitle(title) {
        this.props.dispatch(saveCategoryAction(null, this.props.categoryBlank.set("title", title)));
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

    calculateDonePercentage(brightnessPercentage) {
        let result = {percentage: 0, red: 0, green: 0};
        let todoCount = this.props.getTodoMap.size;
        let doneTodoCount = 0;
        this.props.getTodoMap.valueSeq().reduce((collector, item) => {
            if (item.get("isDone")) {doneTodoCount += 1}
            return collector;
        }, doneTodoCount);
        brightnessPercentage = 255 * brightnessPercentage / 100;
        result.percentage = Math.round(100 * doneTodoCount / todoCount);
        result.red = result.percentage < 51 ? brightnessPercentage : Math.round((100 - (result.percentage - 50)) * brightnessPercentage / 100);
        result.green = result.percentage < 51 ? Math.round(result.percentage * 2 * brightnessPercentage / 100) : brightnessPercentage;
        return result;
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
        let doneResult = this.calculateDonePercentage(100);
        return (
            <div className="todo-list">
                <LinearProgress className="todo-progress" mode="determinate"
                                color={"rgb(" + doneResult.red + ", " + doneResult.green + ", 0)"}
                                style={{height: '15px', backgroundColor: 'white'}}
                                value={doneResult.percentage}/>
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