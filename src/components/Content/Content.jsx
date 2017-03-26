import * as React from "react";

import "./Content.scss"

export class Content extends React.Component{

    constructor() {
        super();
    }

    render(){
        return (
            <div className="content">
                {this.props.children}
            </div>
        )
    }
}