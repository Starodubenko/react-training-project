import {createSelector} from 'reselect'
import {getFilteredTodoMap} from "../TodoSelector/TodoSelector"
import {getFilter} from "../FilterSelector/FilterSelector";


const getCategoryMap = (state) => state.category.getIn(['categoryData', 'entities', 'category']);

const getFilteredCategoryMap = createSelector(
    getFilteredTodoMap,
    getCategoryMap,
    getFilter,
    (todoMap, categoryMap, filter) => {
        return categoryMap.filter((category) => {
            return !filter.get("filterString") && !category.get("isDeleted") ||
                !category.get("isDeleted") && category.get("todoList").some(todoId => todoMap.get("" + todoId))
        });
    }
);

export {getCategoryMap, getFilteredCategoryMap}