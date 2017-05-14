// import React from 'react';
// import * as TestUtils from 'react-addons-test-utils';
// import {before, beforeEach} from "mocha";
// import { fromJS } from 'immutable'
// import {moveTodo} from "./CategoryActions";


test('Tests of main functions of category actions', () => {

    expect(3).toBe(3);

    // let testCategoryData = null;
    // let testCategory = null;
    //
    // before(() => {
    //     testCategory = fromJS({
    //         categories: [],
    //         id: 1,
    //         isDeleted: false,
    //         title: "",
    //         todoList: []
    //     })
    // });
    //
    // beforeEach(()=>{
    //     testCategoryData = fromJS({
    //         entities: {
    //             category: {
    //                 1: {
    //                     categories: [],
    //                     id: 1,
    //                     isDeleted: false,
    //                     title: "",
    //                     todoList: [1]
    //                 },
    //                 2: {
    //                     categories: [],
    //                     id: 1,
    //                     isDeleted: false,
    //                     title: "",
    //                     todoList: []
    //                 }
    //             },
    //             todo: {
    //                 1: {
    //                     description: "",
    //                     id: 1,
    //                     isDone: false,
    //                     title: "Test todo 1"
    //                 }
    //             }
    //         },
    //         result: []
    //     })
    // });

    it ('move todo to from 1st to 2nd category', ()=>{
        debugger;
        // let resultData = moveTodo(testCategoryData, "1", 1, 2);
        // expect(resultData.getIn(["entities", "category", "2", "todoList"])).toContain(1);
    });

    it ('add category to the first line', ()=>{

    });

    it ('add category to the child line', ()=>{

    });

    it ('update category title', ()=>{

    });

    it ('remove category', ()=>{

    });


});
