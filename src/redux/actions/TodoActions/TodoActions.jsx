import {ADD_TODO, FREE_TODO_EDIT, SET_TODO_TO_EDIT, START_TODO_PROCESSING, TOGGLE_TODO_DONE_STATUS} from "../../reducers/TodoReducer/TodoReducer";
import Request from "superagent"


export function startTodoProcessingAction(){
    return {
        type: START_TODO_PROCESSING,
        payload: null
    }
}

export function addTodoAction(){
  return {
      type: ADD_TODO,
      payload: null
    }
}

export function setTodoToEditAction(){
    return {
        type: SET_TODO_TO_EDIT,
        payload: null
    }
}

export function FreeTodoEditAction(data){
  return {
      type: FREE_TODO_EDIT,
      payload: {
        user: {id: 1, fullName: data.username + " Doe"},
      }
    }
}

export function toggleTodoDoneStatusAction(){
    return {
        type: TOGGLE_TODO_DONE_STATUS,
        payload: null
    }
}