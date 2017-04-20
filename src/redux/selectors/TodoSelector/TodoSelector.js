import {createSelector} from 'reselect'
import {getFilter} from '../FilterSelector/FilterSelector'
import {fromJS} from 'immutable'

const getTodoMap = (state) => state.category.getIn(['categoryData', 'entities', 'todo']);

const getFilteredTodoMap = createSelector(
    getFilter,
    getTodoMap,
    (filter, todoMap) => {
        return todoMap.filter((todo) => {
            return (!filter.get("filterString") || todo.get("title").includes(filter.get("filterString"))) &&
                (!todo.get("isDone") || (filter.get("isShownDoneItems") && todo.get("isDone")));
        });
    }
);

export {getTodoMap, getFilteredTodoMap}