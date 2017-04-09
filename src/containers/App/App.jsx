import * as React from "react";
import {Header, Content, Footer} from "../../components";
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import "./App.scss"
import DataService from "../../services/data.service";

export class App extends React.Component {

    constructor(){
        super();
        this.dataService =  DataService.getInstance();

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

    getChildContext(){
        return {
            muiTheme: getMuiTheme()
        }
    }

    componentWillMount(){
        this.setState({
            data: this.dataService.getData(),
            filterString: ""
        });
    }

    getGlobalState(){
        return this.state.data;
    }

    setGlobalState(updatedData){
        this.setState({data: updatedData})
    }

    onFilterChange(value){
        this.setState({filterString: value});
    }

    filterData(){
        let filterString = this.state.filterString;
        let filteredData = Object.assign({}, this.dataService.getData());
        let filteredTodoMap = this.arrayToMap(this.mapToArray(this.state.data.entities.todo).filter(todo => filterString === "" || todo.title.includes(filterString)));
        let filteredCategoryMap = this.arrayToMap(this.mapToArray(this.state.data.entities.category).filter(currentCategory => {
            let result = this.detectTodoInCategory(this.state.data.entities.category, currentCategory, filteredTodoMap);
            return result;
        }));
        filteredData.result = [...filteredData.result];
        filteredData.entities = {};
        filteredData.entities.todo = filteredTodoMap;
        filteredData.entities.category = filteredCategoryMap;
        return filteredData;
    }

    detectTodoInCategory(categoryList, category, todoArray){
        if (!category.todoList){
            return false;
        } else if (this.isElementsInArray(todoArray, category.todoList)){
            return true;
        } else {
            let result = false;
            category.todoList = [];
            [...category.categories].forEach((categoryId) => {
                result = this.detectTodoInCategory(categoryList, categoryList[categoryId], todoArray);
                return result;
            });
            return result;
        }
    }

    isElementsInArray(elements, array){
        return array.some(element => elements[element]);
    }
    mapToArray(map){
        let keys = Object.keys(map);
        let array = [];
        keys.forEach(id => array.push(map[id]));
        return array;
    }
    arrayToMap(array){
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
                <Header onFilterChange={this.onFilterChange}/>
                <Content>
                    {child}
                </Content>
                <Footer>
                </Footer>
            </div>
        )
    }
}