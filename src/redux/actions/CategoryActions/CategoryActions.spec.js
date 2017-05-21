import React from 'react';
import {fromJS} from 'immutable'
import {moveTodo} from "./CategoryActions";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {addCategory, setCategoryListAction, saveCategoryAction} from "./CategoryActions";
import {SET_CATEGORY_DATA} from "../../reducers/CategoryReducer/CategoryReducer";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Category actions tests", () => {

    let testCategoryData = null;
    let testObjectWithCategoryData = null;
    let testCategory = null;

    beforeAll(() => {
        testCategory = fromJS({
            categories: [],
            id: 1,
            isDeleted: false,
            title: "",
            todoList: []
        })
    });

    beforeEach(() => {
        let categoryData = {
            entities: {
                category: {
                    1: {
                        categories: [],
                        id: 1,
                        isDeleted: false,
                        title: "",
                        todoList: [1]
                    },
                    2: {
                        categories: [],
                        id: 1,
                        isDeleted: false,
                        title: "",
                        todoList: []
                    }
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
            result: []
        };

        testObjectWithCategoryData = fromJS({categoryData: categoryData});
        testCategoryData = fromJS(categoryData);
    });

    test('Save first line category (action)', () => {
        const categoryList = fromJS({
            1: {
                categories: [],
                id: 1,
                isDeleted: false,
                title: "",
                todoList: []
            }
        });
        const categoryData = fromJS({entities: {category: {}, todo: {}}, result: []});
        const expectedAction = {
            type: SET_CATEGORY_DATA,
            payload: {
                categoryData: categoryList,
            }
        };
        const store = mockStore(categoryData);


        store.dispatch(setCategoryListAction(categoryList));
        let actions = store.getActions();
        expect(actions).toEqual([expectedAction]);
    });

    test('Save category (action)', () => {
        const newCategory = fromJS({
            categories: [],
            id: null,
            isDeleted: false,
            title: "",
            todoList: []
        });
        const store = mockStore({category: testObjectWithCategoryData});

        expect(store.getState().category.getIn(["categoryData", "entities", "category"]).size).toEqual(2);
        return store.dispatch(saveCategoryAction(null, newCategory))
            .then(() => {
                expect(store.getActions()[0].payload.categoryData.getIn(["entities", "category"]).size).toEqual(3)
            })
    });

    test('move todo to from 1st to 2nd category (function)', () => {
        const todoId = 1;
        const fromCategoryId = 1;
        const toCategoryId = 2;
        let firstCategoryTodoArray;
        let secondCategoryTodoArray;
        let resultData;

        firstCategoryTodoArray = testCategoryData.getIn(["entities", "category", fromCategoryId.toString(), "todoList"]);
        expect(firstCategoryTodoArray).toContain(todoId);

        resultData = moveTodo(testCategoryData, todoId, fromCategoryId, toCategoryId);

        firstCategoryTodoArray = resultData.getIn(["entities", "category", fromCategoryId.toString(), "todoList"]);
        expect(firstCategoryTodoArray).not.toContain(todoId);

        secondCategoryTodoArray = resultData.getIn(["entities", "category", toCategoryId.toString(), "todoList"]);
        expect(secondCategoryTodoArray).toContain(todoId);
    });

    test('add category to the first line (method)', () => {
        const categoryJs = fromJS({
            categories: [],
            id: 3,
            isDeleted: false,
            title: "",
            todoList: []
        });
        const category = fromJS(categoryJs);

        let resultData = addCategory(testCategoryData, null, category);
        let categoryList = resultData.getIn(["entities", "category", category.get("id").toString()]);

        expect(categoryList).toEqual(category);
    });
    //
    // test('add category to the child line', () => {
    //
    // });
    //
    // test('update category title', () => {
    //
    // });
    //
    // test('remove category', () => {
    //
    // });
});

