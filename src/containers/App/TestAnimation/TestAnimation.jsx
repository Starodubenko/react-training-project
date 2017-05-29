import * as React from "react";
import {connect} from "react-redux";
import "./TestAnimation.scss";

@connect((store, props) => {
    return {

    }
})
export class TestAnimation extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <div className="test-animation-container">
                <div className="item"></div>
            </div>
        )
    }
}