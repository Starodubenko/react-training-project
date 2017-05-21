import {
    START_CATEGORY_PROCESSING,
    SET_CATEGORY_DATA,
    SET_CATEGORY_PROCESSOR,
    FREE_CATEGORY_PROCESSOR,
    SET_CATEGORY_ERROR,
} from "../../reducers/CategoryReducer/CategoryReducer";

import Request from "superagent"
import DataService from "../../../services/data.service";
import { fromJS } from 'immutable'

export function startCategoryProcessAction() {
    return {
        type: START_CATEGORY_PROCESSING,
        payload: null
    }
}

export function setCategoryListAction(data) {
    return {
        type: SET_CATEGORY_DATA,
        payload: {
            categoryData: data,
        }
    }
}

export function fetchCategoryListAction() {
    return (dispatch, getState) => {
        let dataService = DataService.getInstance();
        return dataService.getData().then((data) => dispatch(setCategoryListAction(fromJS(data))));
    };
}

export function saveCategoryAction(parentId, category) {
    return (dispatch, getState) => {
        let dataService = DataService.getInstance();
        let updatedData = getState().category.get("categoryData");
        if (category.get("id")){
            return dataService.updateCategory(category)
                .then(data => {
                    return dispatch(setCategoryListAction(updateCategory(updatedData, category)))
                })
        } else {
            return dataService.addCategory(parentId, category)
                .then(data => {
                    let categoryWithNewId = category.set("id", data.id);
                    console.log("new category id = " + categoryWithNewId.get("id"));
                    return dispatch(setCategoryListAction(addCategory(updatedData, parentId, categoryWithNewId)))
                })
        }
    };
}

export function removeCategoryAction(id) {
    return (dispatch, getState) => {
        let updatedData = getState().category.get("categoryData");
        return dispatch(setCategoryListAction(removeCategoryTree(updatedData, id)));
    };
}

export function putTodoInCategoryAction(toDoId, fromCategoryId, toCategoryId) {
    return (dispatch, getState) => {
        let updatedData = getState().category.get("categoryData");
        return dispatch(setCategoryListAction(moveTodo(updatedData, toDoId, fromCategoryId, toCategoryId)));
    };
}

export function setCategoryProcessorAction(parentId, data) {
    return {
        type: SET_CATEGORY_PROCESSOR,
        payload: {
            parentId: parentId,
            category: data
        }
    }
}

export function freeCategoryProcessorAction() {
    return {
        type: FREE_CATEGORY_PROCESSOR,
        payload: null
    }
}

export function setCategoryErrorAction() {
    return {
        type: SET_CATEGORY_ERROR,
        payload: null
    }
}

export function moveTodo(updatedData, toDoId, fromCategoryId, toCategoryId){
    let fromTodoIds = updatedData.getIn(["entities", "category", "" + fromCategoryId, "todoList"]);
    fromTodoIds = fromTodoIds.splice(fromTodoIds.indexOf(+toDoId),1);
    let toTodoIds = updatedData.getIn(["entities", "category", "" + toCategoryId, "todoList"]);
    toTodoIds = toTodoIds.push(+toDoId);
    let result = updatedData.setIn(["entities", "category", "" + fromCategoryId, "todoList"], fromTodoIds);
    result = result.setIn(["entities", "category", "" + toCategoryId, "todoList"], toTodoIds);
    return result;
}

export function removeCategoryTree(updatedData, categoryId){
    let result = updatedData;
    let removingCategory = updatedData.getIn(["entities", "category", "" + categoryId]);
    let subCategoryIds = removingCategory.get("categories");
    if (subCategoryIds.size){
        subCategoryIds.forEach(subCategoryId => result = removeCategoryTree(result, subCategoryId));
        removingCategory = removingCategory.set("isDeleted", true);
        result = result.setIn(["entities", "category", "" + categoryId], removingCategory);
    } else {
        removingCategory = removingCategory.set("isDeleted", true);
        result = updatedData.setIn(["entities", "category", "" + categoryId], removingCategory);
    }
    return result;
}

export function updateCategory(updatedData, categoryEntity){
    return updatedData.setIn(["entities", "category", categoryEntity.get("id")], categoryEntity);
}

export function addCategory(updatedData, parent, categoryEntity){
    let result = null;
    let newId = +categoryEntity.get("id");
    let parentSubCategoryList = updatedData.getIn(["entities", "category", "" + parent, "categories"]);
    if (parentSubCategoryList){
        parentSubCategoryList = parentSubCategoryList.push(newId);
        result = updatedData.setIn(["entities", "category", "" + parent, "categories"], parentSubCategoryList);
    } else {
        parentSubCategoryList = updatedData.getIn(["result"]);
        parentSubCategoryList = parentSubCategoryList.push(newId);
        result = updatedData.setIn(["result"], parentSubCategoryList);
    }
    return result.setIn(["entities", "category", "" + newId], categoryEntity);
}
