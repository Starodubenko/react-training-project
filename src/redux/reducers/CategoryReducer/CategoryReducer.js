export const START_LOG_IN = "START_LOG_IN_SYSTEM";


const CategoryReducer = (state = {
    user: null,
    logining: false,
    loggedIn: false,
    error: null
}, action) => {
    switch (action.type) {
        case START_LOG_IN: {
            return {
                ...state,
                logining: true
            }
        }
        case END_LOG_IN: {
            return {
                ...state,
                logining: false,
                loggedIn: true,
                user: action.payload.user
            }
        }
        case LOG_IN_REJECTED: {
            return {
                ...state,
                logining: false,
                error: action.payload
            }
        }
        case LOG_OUT: {
            return {
                ...state,
                user: null,
                logining: false,
                loggedIn: false,
                error: null
            }
        }
        default:
            return state;
    }
};

export default CategoryReducer;