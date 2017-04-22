export const START_CATEGORY_PROCESSING = "START_CATEGORY_PROCESSING";
export const SET_CATEGORY_ERROR = "SET_CATEGORY_ERROR";
export const SET_CATEGORY_DATA = "SET_CATEGORY_DATA";

export const SET_CATEGORY_PROCESSOR = "SET_CATEGORY_PROCESSOR";
export const FREE_CATEGORY_PROCESSOR = "FREE_CATEGORY_PROCESSOR";
export const SET_TODO_PROCESSOR = "SET_TODO_PROCESSOR";
export const FREE_TODO_PROCESSOR = "FREE_TODO_PROCESSOR";

import { fromJS, Map } from 'immutable'

const initialState = fromJS({
    categoryData: null,
    categoryBlank: {id: null, title: "", isDeleted: false, todoList: [], categories: []},
    todoBlank: {id: null, title: "", isDone: false, description: ""},
    processingCategory: null,
    processingCategoryParentId: null,
    processingTodo: null,
    processingTodoParentId: null,
    processing: false,
    error: null
});

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case START_CATEGORY_PROCESSING: {
            return state.mergeDeep({
                processing: true
            })
        }
        case SET_CATEGORY_ERROR: {
            return state.mergeDeep({
                processing: false,
                error: action.payload.error
            })
        }
        case SET_CATEGORY_DATA: {
            return state.mergeDeep({
                processing: false,
                categoryData: action.payload.categoryData,
                processingCategory: null
            })
        }
        // edit part
        case SET_CATEGORY_PROCESSOR: {
            return state.mergeDeep({
                processingCategoryParentId: action.payload.parentId,
                processingCategory: action.payload.category
            })
        }
        case FREE_CATEGORY_PROCESSOR: {
            return state.mergeDeep({
                processingCategoryParentId: null,
                processingCategory: null
            })
        }
        case SET_TODO_PROCESSOR: {
            return state.mergeDeep({
                processingTodoParentId: action.payload.parentId,
                processingTodo: action.payload.todo
            })
        }
        case FREE_TODO_PROCESSOR: {
            return state.mergeDeep({
                processingTodoParentId: null,
                processingTodo: null
            })
        }
        default:
            return state;
    }
};

export default CategoryReducer;