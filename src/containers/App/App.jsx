import * as React from "react";
import {Header, Content, Footer} from "../../components";
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';
import DataService from "../../services/data.service";
import {connect} from "react-redux";

injectTapEventPlugin();
import "./App.scss"


@connect((store) => {
    return {

    }
})
export class App extends React.Component {

    constructor() {
        super();
        this.dataService = DataService.getInstance();

        this.getGlobalState = this.getGlobalState.bind(this);
        this.setGlobalState = this.setGlobalState.bind(this);

        this.onFilterChange = this.onFilterChange.bind(this);
        this.filterData = this.filterData.bind(this);
        this.detectTodoInCategory = this.detectTodoInCategory.bind(this);
        this.mapToArray = this.mapToArray.bind(this);
        this.arrayToMap = this.arrayToMap.bind(this);
        this.isElementsInArray = this.isElementsInArray.bind(this);
    }

    static childContextTypes = {
        muiTheme: React.PropTypes.object
    };

    getChildContext() {
        return {
            muiTheme: getMuiTheme()
        }
    }

    componentWillMount() {
        this.setState({
            data: this.dataService.getData(),
            filterString: "",
            isShownDoneItems: false
        });
    }

    getGlobalState() {
        return this.state.data;
    }

    setGlobalState(updatedData) {
        this.dataService.setData(updatedData);
        this.setState({data: updatedData})
    }

    onFilterChange() {
        this.forceUpdate();
    }

    filterData() {
        let {filterString, isShownDoneItems} = this.props.location.query;
        isShownDoneItems = isShownDoneItems == "true";
        let filteredData = Object.assign({}, this.dataService.getData());
        let filteredTodoMap = this.arrayToMap(
            this.mapToArray(this.state.data.entities.todo)
                .filter(todo =>
                (!filterString || todo.title.includes(filterString)) &&
                (!todo.isDone || (isShownDoneItems && todo.isDone))));
        let filteredCategoryMap = this.arrayToMap(
            this.mapToArray(this.state.data.entities.category)
                .filter(currentCategory =>
                !filterString ||
                this.detectTodoInCategory(this.state.data.entities.category, currentCategory, filteredTodoMap)));
        filteredData.result = [...filteredData.result];
        filteredData.entities = {};
        filteredData.entities.todo = filteredTodoMap;
        filteredData.entities.category = filteredCategoryMap;
        return filteredData;
    }

    detectTodoInCategory(categoryList, category, todoArray) {
        if (!category.todoList) {
            return false;
        } else if (this.isElementsInArray(todoArray, category.todoList)) {
            return true;
        } else {
            let result = false;
            [...category.categories].forEach((categoryId) => {
                result = this.detectTodoInCategory(categoryList, categoryList[categoryId], todoArray);
                return result;
            });
            return result;
        }
    }

    isElementsInArray(elements, array) {
        return array.some(element => elements[element]);
    }

    mapToArray(map) {
        let keys = Object.keys(map);
        let array = [];
        keys.forEach(id => array.push(map[id]));
        return array;
    }

    arrayToMap(array) {
        let map = {};
        array.forEach(item => map[item.id] = item);
        return map;
    }

    render() {

        let filteredData = this.filterData();

        let child = React.Children.map(this.props.children, (child) => {
            return React.cloneElement(child, {
                originalData: this.state.data,
                data: filteredData,
                setGlobalState: this.setGlobalState
            })
        });

        return (
            <div className="app">
                <Header {...this.props} onFilterChange={this.onFilterChange}/>
                <Content>
                    {child}
                </Content>
                <Footer>
                </Footer>
            </div>
        )
    }
}