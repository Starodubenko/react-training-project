import * as React from "react";
import * as ReactDOM from "react-dom";
import Routes from "./routes";
import store from "./redux/create"
import {Provider} from "react-redux";

window.onload = () => {
    ReactDOM.render((
        <Provider store={store} key="provider">
            <Routes store={store} />
        </Provider>
        ), document.querySelector('#container')
    );
};
