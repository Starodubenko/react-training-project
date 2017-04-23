import {SET_DONE_CHECK_BOX, SET_FILTER_STRING} from "../../reducers/FilterReducer/FilterReducer";
import Request from "superagent"

export function setFilterStringAction(string){
  return {
      type: SET_FILTER_STRING,
      payload: {
          filterString: string
      }
    }
}

export function cleanFilterStringAction(){
  return {
      type: SET_FILTER_STRING,
      payload: {
          filterString: ""
      }
    }
}

export function setDoneCheckBoxAction(state){
  return {
      type: SET_DONE_CHECK_BOX,
      payload: {
          isShownDoneItems: state
      }
    }
}

// export function loginAction