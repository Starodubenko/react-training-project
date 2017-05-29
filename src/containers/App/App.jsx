import * as React from "react";
import {Header, Content, Footer} from "../../components";
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';
import DataService from "../../services/data.service";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

injectTapEventPlugin();
import "./App.scss"
import {fetchCategoryListAction} from "../../redux/actions/CategoryActions/CategoryActions";
import {CircularProgress} from "material-ui";


@connect((store, props) => {
    return {
        categoryData: store.category.get("categoryData")
    }
})
export class App extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch(fetchCategoryListAction());

        this.onFilterChange = this.onFilterChange.bind(this);
    }

    static childContextTypes = {
        muiTheme: PropTypes.object
    };

    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        }
    }

    onFilterChange() {
        this.forceUpdate();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <div className="app">
                <Header onFilterChange={this.onFilterChange}/>
                <Content>
                    {this.props.categoryData ? this.props.children :
                        <div className="spinner">
                            <CircularProgress size={80} thickness={5}/>
                        </div>}
                </Content>
                <Footer>
                </Footer>
            </div>
        )
    }
}