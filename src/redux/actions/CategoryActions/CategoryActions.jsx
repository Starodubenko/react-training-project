import {START_CATEGORY_PROCESSING, ADD_CATEGORY, REMOVE_CATEGORY} from "../../reducers/CategoryReducer/CategoryReducer";

import Request from "superagent"


export function startCategoryProcessAction(){
  return {
      type: START_CATEGORY_PROCESSING,
      payload: null
    }
}

export function addCategoryAction(data){
  return {
      type: ADD_CATEGORY,
      payload: {
        user: {id: 1, fullName: data.username + " Doe"},
      }
    }
}

export function RemoveAction(){
  return {
      type: REMOVE_CATEGORY,
      payload: null
    }
}