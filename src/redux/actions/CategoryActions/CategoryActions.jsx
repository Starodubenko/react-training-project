import {START_LOG_IN, END_LOG_IN, LOG_IN_REJECTED, LOG_OUT} from "../../reducers/AuthReducer/AuthReducer";
import Request from "superagent"


export function startLogInAction(){
  return {
      type: START_LOG_IN,
      payload: null
    }
}

export function logInIsSuccessAction(data){
  return {
      type: END_LOG_IN,
      payload: {
        user: {id: 1, fullName: data.username + " Doe"},
      }
    }
}

export function logOutAction(){
  return {
      type: LOG_OUT,
      payload: null
    }
}

// export function loginAction