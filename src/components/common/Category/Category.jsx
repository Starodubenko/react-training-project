import * as React from "react";
import {IconButton, Paper} from "material-ui";
import {
    EditorModeEdit,
    ActionDeleteForever,
    ContentAddBox,
    NavigationExpandMore,
    NavigationChevronRight
} from "material-ui/svg-icons/index";
import {hashHistory, Link} from 'react-router';

import "./Category.scss"

export class Category extends React.Component {

    constructor() {
        super();
        this.state = {
            isChildrenCollapsed: true
        };
        this.expandCategory = this.expandCategory.bind(this);
    }

    expandCategory(e) {
        e.stopPropagation();
        if (this.props.categoryData.categories.length > 0) {
            this.setState(
                {
                    isChildrenCollapsed: !this.state.isChildrenCollapsed
                }
            )
        }
    }

    render() {
        let {serviceActions, categoryData, parentId} = this.props;
        let childrenTree = serviceActions.createCategoryTree(serviceActions, categoryData.categories, categoryData.id);
        return (
            <Link className="category" activeClassName={'active'} to={'category-list/' + categoryData.id}>
                <Paper className="paper" zDepth={2} children={
                    <div className="main">
                        <div className="title">
                            <div className="expand">
                                {categoryData.categories.length < 1 ? "" :
                                    <IconButton>
                                        {this.state.isChildrenCollapsed ?
                                            <NavigationChevronRight onClick={this.expandCategory}/> :
                                            <NavigationExpandMore onClick={this.expandCategory}/>}
                                    </IconButton>}
                            </div>
                            {categoryData.title}
                        </div>
                        <div className="actions">
                            <div className="edit">
                                <IconButton>
                                    <EditorModeEdit onClick={serviceActions.editCategory}/>
                                </IconButton>
                            </div>
                            <div className="remove">
                                <IconButton>
                                    <ActionDeleteForever onClick={(e) => {serviceActions.removeCategory(parentId, categoryData.id, e)}}/>
                                </IconButton>
                            </div>
                            <div className="add">
                                <IconButton>
                                    <ContentAddBox onClick={serviceActions.newCategory}/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                }/>
                <div
                    className={(categoryData.categories ? 'children ' : '') + (this.state.isChildrenCollapsed ? 'collapsed' : '')}>
                    {childrenTree}
                </div>
            </Link>
        )
    }
}