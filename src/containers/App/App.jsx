import * as React from "react";
import { normalize, schema } from 'normalizr';
import {Header, Content, Footer} from "../../components";
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';

import "./App.scss"

export class App extends React.Component {

    static childContextTypes =
        {
            muiTheme: React.PropTypes.object
        }

    getChildContext()
    {
        return {
            muiTheme: getMuiTheme()
        }
    }

    constructor(){
        injectTapEventPlugin();
        super();

//         const todo = new schema.Entity('todos');
//
// // Define your comments schema
//         const category = new schema.Entity('categories', {
//             commenter: user
//         });
//
// // Define your article
//         const article = new schema.Entity('articles', {
//             author: user,
//             comments: [ comment ]
//         });
//
//         const normalizedData = normalize(originalData, article);
    }

    render() {
        return (
            <div className="app">
                <Header />
                <Content>
                    {this.props.children}
                </Content>
                <Footer>
                </Footer>
            </div>
        )
    }
}