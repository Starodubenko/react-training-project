import * as React from "react";
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