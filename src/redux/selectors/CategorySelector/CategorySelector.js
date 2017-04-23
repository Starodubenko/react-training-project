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
            return detectShownCategory(todoMap, categoryMap, filter, category);
        });
    }
);

const detectShownCategory = (todoMap, categoryMap, filter, category) => {
  let subCategoryIds = category.get("categories");
  if (subCategoryIds.size){
      let isSubCategoriesShown = subCategoryIds.some(subCategoryId => detectShownCategory(todoMap, categoryMap, filter, categoryMap.get("" + subCategoryId)));
      return !isSubCategoriesShown ?
          !category.get("isDeleted") && (
              !filter.get("filterString") ||
              category.get("todoList").some(todoId => todoMap.get("" + todoId))
          ) : isSubCategoriesShown;

  } else {
      return !category.get("isDeleted") && (
          !filter.get("filterString") ||
          category.get("todoList").some(todoId => todoMap.get("" + todoId))
      )
  }
};

export {getCategoryMap, getFilteredCategoryMap}