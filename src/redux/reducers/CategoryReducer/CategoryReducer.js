export const START_CATEGORY_PROCESSING = "START_CATEGORY_PROCESSING";
export const START_TODO_PROCESSING = "START_TODO_PROCESSING";
export const SET_CATEGORY_ERROR = "SET_CATEGORY_ERROR";
export const SET_CATEGORY_DATA = "SET_CATEGORY_DATA";

import { fromJS, Map } from 'immutable'

const initialState = fromJS({
    categoryData: null,
    categoryBlank: {id: null, title: "", isDeleted: false, todoList: [], categories: []},
    todoBlank: {id: null, title: "", isDone: false, description: ""},
    error: null,

    isCategoryProcessing: null,
    isTodoProcessing: null,
});

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CATEGORY_PROCESSING: {
            return state.mergeDeep({
                isCategoryProcessing: true
            })
        }
        case START_TODO_PROCESSING: {
            return state.mergeDeep({
                isTodoProcessing: true
            })
        }
        case SET_CATEGORY_ERROR: {
            return state.mergeDeep({
                error: action.payload.errorText,
                isTodoProcessing: false,
                isCategoryProcessing: false
            })
        }
        case SET_CATEGORY_DATA: {
            return state.merge({
                categoryData: action.payload.categoryData,
                isTodoProcessing: false,
                isCategoryProcessing: false
            })
        }
        default:
            return state;
    }
};

export default CategoryReducer;