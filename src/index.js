import * as React from "react";
import * as ReactDOM from "react-dom";
import Routes from "./routes";

window.onload = () => {
    ReactDOM.render((
            <Routes />
        ), document.querySelector('#container')
    );
};
