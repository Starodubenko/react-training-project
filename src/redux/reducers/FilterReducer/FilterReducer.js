export const SET_FILTER_STRING = "SET_FILTER_STRING";
export const SET_DONE_CHECK_BOX = "SET_DONE_CHECK_BOX";

import { fromJS } from 'immutable'

const initialState = fromJS({
    filterString: "",
    isShownDoneItems: false
});

const FilterReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_FILTER_STRING: {
            return state.mergeDeep({
                filterString: action.payload.filterString
            })
        }
        case SET_DONE_CHECK_BOX: {
            return state.mergeDeep({
                isShownDoneItems: action.payload.isShownDoneItems
            })
        }
        default:
            return state;
    }
};

export default FilterReducer;