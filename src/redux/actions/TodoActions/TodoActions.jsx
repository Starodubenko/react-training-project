import {SET_TODO_PROCESSOR, FREE_TODO_PROCESSOR} from "../../reducers/CategoryReducer/CategoryReducer"

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
        type: SET_TODO_LIST,
        payload: {
            todoList: data
        }
    }
}

export function updateTodoAction(updatedTodo){
    return (dispatch, getState) => {
        let updatedTodoList = null;

        return dispatch(setTodoListAction(updatedTodoList));
    };
}

export function addTodoAction(todo){
    return (dispatch, getState) => {
        let updatedTodoList = null;

        return dispatch(setTodoListAction(updatedTodoList));
    };
}

function toggleTodoDoneStatusAction(id) {
    return (dispatch, getState) => {
        let updatedTodoList = null;

        return dispatch(setTodoListAction(updatedTodoList));
    };
}