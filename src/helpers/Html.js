import React, {Component, PropTypes} from "react";
// import ReactDomServer from "react-dom/server";
var ReactDomServer = require('react-dom/server');
import Routes from "../routes";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class Html extends Component {

    render() {
        console.log(" Start Html.js rendering");
        const {assets, component, store} = this.props;
        const content = component ? ReactDomServer.renderToString(component) : '';

        return (
            <MuiThemeProvider>
                <html lang="en-us">
                <head>
                </head>
                <body>
                <Routes/>
                <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
                <script src={assets} charSet="UTF-8"/>
                </body>
                </html>
            </MuiThemeProvider>
        );
    }
}
