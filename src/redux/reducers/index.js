import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import { routerReducer } from 'react-router-redux'
import AuthReducer from "./AuthReducer/AuthReducer"
import CategoryReducer from "./CategoryReducer/CategoryReducer";
import FilterReducer from "./FilterReducer/FilterReducer";

export default combineReducers({
    form: formReducer,
    routing: routerReducer,
    auth: AuthReducer,
    category: CategoryReducer,
    filter: FilterReducer
})