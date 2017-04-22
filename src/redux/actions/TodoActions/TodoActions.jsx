import {SET_TODO_PROCESSOR, FREE_TODO_PROCESSOR, SET_CATEGORY_DATA} from "../../reducers/CategoryReducer/CategoryReducer"
import DataService from "../../../services/data.service";

export function setTodoToEditAction(id){
    return {
        type: SET_TODO_PROCESSOR,
        payload: {
            todo: data
        }
    }
}

export function freeTodoEditAction(){
  return {
      type: FREE_TODO_PROCESSOR,
      payload: null
    }
}

export function setTodoListAction(data){
    return {
        type: SET_CATEGORY_DATA,
        payload: {
            categoryData: data,
        }
    }
}

export function toggleTodoDoneStatusAction(id) {
    return (dispatch, getState) => {
        let updatedData = getState().category.get("categoryData");
        let todo = updatedData.getIn(["entities", "todo", "" + id]);
        let result = updatedData.setIn(["entities", "todo", "" + todo.get("id")], todo.set("isDone", !todo.get("isDone")));
        return dispatch(setTodoListAction(result));
    };
}

export function saveTodoAction(categoryId, todo) {
    return (dispatch, getState) => {
        let dataService = DataService.getInstance();
        let updatedData = getState().category.get("categoryData");
        if (todo.get("id")){
            dataService.updateTodo(todo)
                .then(data => {
                    return dispatch(setTodoListAction(updateTodo(updatedData, todo)))
                })
        } else {
            dataService.addTodo(todo)
                .then(data => {
                    return dispatch(setTodoListAction(addTodo(updatedData, categoryId, todo.set("id", data.id))))
                })
        }
    };
}

const updateTodo = (updatedData, todo) => {
    return updatedData.setIn(["entities", "todoList", todo.get("id")], todo);
};

const addTodo = (updatedData, categoryId, todo) => {
    let todoList = updatedData.getIn(["entities", "category", "" + categoryId, "todoList"]);
    todoList = todoList.push(todo.get("id"));
    updatedData = updatedData.setIn(["entities", "todo", "" + todo.get("id")], todo);
    return updatedData.setIn(["entities", "category", "" + categoryId, "todoList"], todoList);
};