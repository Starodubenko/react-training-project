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
            dataService.updateCategory(category)
                .then(data => {
                    return dispatch(setCategoryListAction(updateCategory(updatedData, category)))
                })
        } else {
            dataService.addCategory(parentId, category)
                .then(data => {
                    return dispatch(setCategoryListAction(addCategory(updatedData, parentId, category.set("id", data.id))))
                })
        }
    };
}

const updateCategory = (updatedData, categoryEntity) =>{
    return updatedData.setIn(["entities", "category", categoryEntity.get("id")], categoryEntity);
};

const addCategory = (updatedData, parent, categoryEntity) =>{
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
};

export function removeCategoryAction(id) {
    return (dispatch, getState) => {
        let updatedCategoryData = getState().category;

        return dispatch(setCategoryListAction(updatedCategoryData));
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