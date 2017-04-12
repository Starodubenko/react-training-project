export const START_TODO_PROCESSING = "START_TODO_PROCESSING";
export const ADD_TODO = "ADD_TODO";
export const TOGGLE_TODO_DONE_STATUS = "TOGGLE_TODO_DONE_STATUS";
export const SET_TODO_TO_EDIT = "SET_TODO_TO_EDIT";
export const FREE_TODO_EDIT = "FREE_TODO_EDIT";


const TodoReducer = (state = {
    user: null,
    logining: false,
    loggedIn: false,
    error: null
}, action) => {
    switch (action.type) {
        case START_TODO_PROCESSING: {
            return {
                ...state,
                logining: true
            }
        }
        case ADD_TODO: {
            return {
                ...state,
                logining: false,
                loggedIn: true,
                user: action.payload.user
            }
        }
        case TOGGLE_TODO_DONE_STATUS: {
            return {
                ...state,
                logining: false,
                error: action.payload
            }
        }
        case SET_TODO_TO_EDIT: {
            return {
                ...state,
                logining: false,
                error: action.payload
            }
        }
        case FREE_TODO_EDIT: {
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

export default TodoReducer;