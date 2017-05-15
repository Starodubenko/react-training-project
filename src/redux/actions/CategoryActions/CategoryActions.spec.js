import React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import {fromJS} from 'immutable'
import {moveTodo} from "./CategoryActions";

let testCategoryData = null;
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
    testCategoryData = fromJS({
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
    })
});

test('move todo to from 1st to 2nd category', () => {
    console.log("testCategory = " + testCategory);
    console.log("testCategoryData = " + testCategoryData);
    debugger;
});

test('add category to the first line', () => {

});

test('add category to the child line', () => {

});

test('update category title', () => {

});

test('remove category', () => {

});
