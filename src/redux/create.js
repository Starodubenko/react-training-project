import {createStore, applyMiddleware, compose} from 'redux';
import {hashHistory} from "react-router";
import reducers from './reducers';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';

const middleware = routerMiddleware(hashHistory);
export default createStore(
    reducers,
    compose(
        applyMiddleware(thunk, middleware),
        window['devToolsExtension'] ? window['devToolsExtension']() : f => f
    )
);