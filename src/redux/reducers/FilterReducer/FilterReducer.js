export const SET_FILTER_STRING = "SET_FILTER_STRING";
export const CLEAN_FILTER_STRING = "CLEAN_FILTER_STRING";
export const SET_DONE_CHECK_BOX = "SET_DONE_CHECK_BOX";


const FilterReducer = (state = {
    user: null,
    logining: false,
    loggedIn: false,
    error: null
}, action) => {
    switch (action.type) {
        case SET_FILTER_STRING: {
            return {
                ...state,
                logining: true
            }
        }
        case CLEAN_FILTER_STRING: {
            return {
                ...state,
                logining: false,
                loggedIn: true,
                user: action.payload.user
            }
        }
        case SET_DONE_CHECK_BOX: {
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

export default FilterReducer;