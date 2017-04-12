export const START_CATEGORY_PROCESSING = "START_CATEGORY_PROCESSING";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const SET_CATEGORY_TO_EDIT = "SET_CATEGORY_TO_EDIT";
export const FREE_CATEGORY_EDIT = "FREE_CATEGORY_EDIT";


const CategoryReducer = (state = {
    user: null,
    logining: false,
    loggedIn: false,
    error: null
}, action) => {
    switch (action.type) {
        case START_CATEGORY_PROCESSING: {
            return {
                ...state,
                logining: true
            }
        }
        case ADD_CATEGORY: {
            return {
                ...state,
                logining: false,
                loggedIn: true,
                user: action.payload.user
            }
        }
        case REMOVE_CATEGORY: {
            return {
                ...state,
                logining: false,
                error: action.payload
            }
        }
        case SET_CATEGORY_TO_EDIT: {
            return {
                ...state,
                logining: false,
                error: action.payload
            }
        }
        case FREE_CATEGORY_EDIT: {
            return {
                ...state,
                logining: false,
                error: action.payload
            }
        }
        default:
            return state;
    }
};

export default CategoryReducer;