import * as React from "react";
import {IconButton, Paper} from "material-ui";
import {
    EditorModeEdit,
    ActionDeleteForever,
    ContentAddBox,
    NavigationExpandMore,
    NavigationChevronRight
} from "material-ui/svg-icons/index";

import "./Category.scss"

export class Category extends React.Component {

    constructor() {
        super();
        this.state = {
            isChildrenCollapsed: true
        };
        this.expandCategory = this.expandCategory.bind(this);
        this.newCategory = this.newCategory.bind(this);
        this.editCategory = this.editCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
    }

    expandCategory() {
        if (this.props.data.children.length > 0) {
            this.setState(
                {
                    isChildrenCollapsed: !this.state.isChildrenCollapsed
                }
            )
        }
    }

    newCategory() {
        console.log("A new category is creating");
    }

    editCategory() {
        console.log("The category is being edited");
    }

    removeCategory() {
        let result = this.findAndDelere(this.props.fullTree, this.props.pathIndexes);
        console.log("The category have been removed");
    }

    findAndDelere(categories, pathIndexes) {
        let currentChild;
        pathIndexes.forEach(index => {
            if (index == 0) {
                currentChild = categories[index];
            } else {
                if (currentChild.children && currentChild.children.children) {
                    currentChild = currentChild.children[index];
                } else {
                    currentChild.children.splice(index, 1);
                }
            }
        });
        return categories;
    }

    createCategoryTree(data, fullTree, pathIndexes) {
        let result = [];
        data.forEach((category, index) => {
            result.push(
                <Category key={index} data={category} fullTree={fullTree} pathIndexes={[...pathIndexes, index]}/>
            )
        });
        return result;
    }

    render() {
        let {data, fullTree, pathIndexes} = this.props;
        let childrenTree = data.children ?
            this.createCategoryTree(data.children, fullTree, [...pathIndexes]) :
            this.createCategoryTree(data, data, []);
        return (
            <div className="category">
                {data.children ? <Paper className="paper" zDepth={2} children={
                    <div className="main">
                        <div className="title">
                            <div className="expand">
                                <IconButton>
                                    {this.state.isChildrenCollapsed ?
                                        <NavigationChevronRight onClick={this.expandCategory}/> :
                                        <NavigationExpandMore onClick={this.expandCategory}/>}
                                </IconButton>
                            </div>
                            {data.title}
                        </div>
                        <div className="actions">
                            <div className="edit">
                                <IconButton>
                                    <EditorModeEdit onClick={this.editCategory}/>
                                </IconButton>
                            </div>
                            <div className="remove">
                                <IconButton>
                                    <ActionDeleteForever onClick={this.removeCategory}/>
                                </IconButton>
                            </div>
                            <div className="add">
                                <IconButton>
                                    <ContentAddBox onClick={this.newCategory}/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                }/> : null}
                <div
                    className={(data.children ? 'children ' : '') + (this.state.isChildrenCollapsed ? 'collapsed' : '')}>
                    {childrenTree}
                </div>
            </div>
        )
    }
}