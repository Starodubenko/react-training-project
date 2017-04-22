import {normalize, schema} from 'normalizr';
const { Map } = require('immutable');
export default class DataService{

    constructor(){
        this.instance = null;
        this.data = null;

        let dataFromRest = [
            {
                id: 1,
                title: "Category #1",
                isDeleted: false,
                todoList: [
                    {
                        id: 1,
                        title: "Todo title #1",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        id: 2,
                        title: "Todo title #2",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        id: 3,
                        title: "Todo title #3",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                ],
                categories: [
                    {
                        id: 2,
                        title: "Category #2",
                        isDeleted: false,
                        todoList: [
                            {
                                id: 4,
                                title: "Todo title #4",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        categories: []
                    },
                    {
                        id: 3,
                        title: "Category #3",
                        isDeleted: false,
                        todoList: [
                            {
                                id: 5,
                                title: "Todo title #5",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        categories: [
                            {
                                id: 4,
                                title: "Category #4",
                                isDeleted: false,
                                todoList: [
                                    {
                                        id: 6,
                                        title: "Todo title #6",
                                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                        isDone: false
                                    }
                                ],
                                categories: []
                            },
                        ]
                    },
                ]
            },
            {
                id: 5,
                title: "Category #5",
                isDeleted: false,
                todoList: [
                    {
                        id: 7,
                        title: "Todo title #7",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        id: 8,
                        title: "Todo title #8",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                    {
                        id: 9,
                        title: "Todo title #9",
                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                        isDone: false
                    },
                ],
                categories: [
                    {
                        id: 6,
                        title: "Category #6",
                        isDeleted: false,
                        todoList: [
                            {
                                id: 10,
                                title: "Todo title #10",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        categories: []
                    },
                    {
                        id: 7,
                        title: "Category #7",
                        isDeleted: false,
                        todoList: [
                            {
                                id: 11,
                                title: "Todo title #11",
                                description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                isDone: false
                            }
                        ],
                        categories: [
                            {
                                id: 8,
                                title: "Category #8",
                                isDeleted: false,
                                todoList: [
                                    {
                                        id: 12,
                                        title: "Todo title #12",
                                        description: "Todo title #1 Todo title #1 Todo title #1 Todo title #1 ",
                                        isDone: false
                                    }
                                ],
                                categories: []
                            },
                        ]
                    },
                ]
            }
        ];

        const todoSchema = new schema.Entity('todo');
        const categorySchema = new schema.Entity('category');
        categorySchema.define({
            todoList: [todoSchema],
            categories: [categorySchema]
        });
        this.data = normalize(dataFromRest, [categorySchema]);
    }

    static getInstance(){
        if (this.instance){
            return this.instance;
        } else {
            this.instance = new DataService();
            return this.instance;
        }
    }

    getData(){
        return new Promise((resolve, reject) => {
            setTimeout(() => {

                resolve(this.data);
            }, 1000);
        });
    }

    setData(updatedData){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }

    addCategory(parent, category){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({id:Math.round(Math.random() * 10000)});
            }, 1000);
        });
    }

    removeCategory(category){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }

    updateCategory(category){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }

    addTodo(parent, category){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({id:Math.round(Math.random() * 10000)});
            }, 1000);
        });
    }

    updateTodo(todo){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(true);
            }, 1000);
        });
    }


};