import {CLEAN_FILTER_STRING, SET_DONE_CHECK_BOX, SET_FILTER_STRING} from "../../reducers/FilterReducer/FilterReducer";
import Request from "superagent"


export function setFilterStringAction(){
  return {
      type: SET_FILTER_STRING,
      payload: null
    }
}

export function cleanFilterStringAction(data){
  return {
      type: CLEAN_FILTER_STRING,
      payload: {
        user: {id: 1, fullName: data.username + " Doe"},
      }
    }
}

export function setDoneCheckBoxAction(){
  return {
      type: SET_DONE_CHECK_BOX,
      payload: null
    }
}

// export function loginAction