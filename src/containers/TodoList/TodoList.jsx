import * as React from "react";

export class TodoList extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                ToDo list Component !!!
                <div>progress</div>
                <div>left-part
                    <div>add category</div>
                    <div>category list</div>
                </div>
                <div>right-part
                    <div>add todo item</div>
                    <div>todo item list</div>
                </div>
            </div>
        )
    }
}