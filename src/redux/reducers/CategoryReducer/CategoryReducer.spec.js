import CategoryReducer from "./CategoryReducer";
import {setCategoryListAction, setCategoryErrorAction} from "../../actions/CategoryActions/CategoryActions";
import {fromJS} from 'immutable'

describe('Category reducer tests', () => {
    let initialState = null;
    let categoryData = null;

    beforeAll(() => {
        initialState = fromJS({
            categoryData: null,
            categoryBlank: {id: null, title: "", isDeleted: false, todoList: [], categories: []},
            todoBlank: {id: null, title: "", isDone: false, description: ""},
            error: null,

            isCategoryProcessing: null,
            isTodoProcessing: null,
        });

        categoryData = fromJS({
            entities: {
                category: {
                    1: {
                        categories: [],
                        id: 1,
                        isDeleted: false,
                        title: "",
                        todoList: [1]
                    },
                },
                todo: {
                    1: {
                        description: "",
                        id: 1,
                        isDone: false,
                        title: "Test todo 1"
                    }
                }
            },
            result: [1]
        });
    });

    test("Category reducer should return init action", () => {
        expect(CategoryReducer(initialState, {})).toEqual(initialState);
    });


    test("Category reducer should process set category", () => {
        let expectedResult = initialState.set("categoryData", categoryData);
        expectedResult = expectedResult.set("isCategoryProcessing", false);
        expectedResult = expectedResult.set("isTodoProcessing", false);

        expect(CategoryReducer(initialState, setCategoryListAction(categoryData))).toEqual(expectedResult);
    });

    test("Category reducer should process set category error", () => {
        let errorMessage = "Error was occurred during the category processing";
        let expectedResult = initialState.set("error", errorMessage);
        expectedResult = expectedResult.set("isCategoryProcessing", false);
        expectedResult = expectedResult.set("isTodoProcessing", false);

        expect(CategoryReducer(initialState, setCategoryErrorAction(errorMessage))).toEqual(expectedResult);
    });
});