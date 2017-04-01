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
            isChildrenCollapsed: true,
            isChildrenEmpty: true,
        };
        this.expandCategory = this.expandCategory.bind(this);
        // if (this.props.data.children && this.props.data.children.length < 1){
        //     this.setState({
        //         isChildrenCollapsed: true,
        //         isChildrenEmpty: true
        //     });
        // } else {
        //     this.setState({
        //         isChildrenEmpty: false
        //     });
        // }
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

    createCategoryTree(serviceActions, data, pathIndexes) {
        let result = [];
        data.forEach((category, index) => {
            result.push(
                <Category key={index} serviceActions={serviceActions} data={category} pathIndexes={[...pathIndexes, index]}/>
            )
        });
        return result;
    }

    render() {
        let {serviceActions, data, pathIndexes} = this.props;
        let childrenTree = data.children ?
            this.createCategoryTree(serviceActions, data.children, [...pathIndexes]) :
            this.createCategoryTree(serviceActions, data, []);
        return (
            <div className="category">
                {data.children ? <Paper className="paper" zDepth={2} children={
                    <div className="main">
                        <div className="title">
                            <div className="expand">
                                {data.children.length < 1 ? "" :
                                    <IconButton>
                                        {this.state.isChildrenCollapsed ?
                                            <NavigationChevronRight onClick={this.expandCategory}/> :
                                            <NavigationExpandMore onClick={this.expandCategory}/>}
                                    </IconButton>}
                            </div>
                            {data.title}
                        </div>
                        <div className="actions">
                            <div className="edit">
                                <IconButton>
                                    <EditorModeEdit onClick={serviceActions.editCategory}/>
                                </IconButton>
                            </div>
                            <div className="remove">
                                <IconButton>
                                    <ActionDeleteForever onClick={() => {serviceActions.removeCategory(pathIndexes)}}/>
                                </IconButton>
                            </div>
                            <div className="add">
                                <IconButton>
                                    <ContentAddBox onClick={serviceActions.newCategory}/>
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