import * as React from "react";
import {IconButton, Paper} from "material-ui";
import {
    EditorModeEdit,
    ActionDeleteForever,
    ContentAddBox,
    NavigationExpandMore,
    NavigationChevronRight,
    ContentReply
} from "material-ui/svg-icons/index";
import {AddInputStringDialog} from "../AddInputStringDialog/AddInputStringDialog";
import {connect} from "react-redux";

import "./Category.scss";
import {push} from "react-router-redux";
import {
    putTodoInCategoryAction, removeCategoryAction,
    setCategoryProcessorAction
} from "../../../redux/actions/CategoryActions/CategoryActions";

@connect((store, props) => {
    return {
        categoryData: store.category.get("categoryData"),
        categoryBlank: store.category.get("categoryBlank"),
    }
})
export class Category extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isChildrenCollapsed: true,
            isActivate: props.category.get("id") === +this.props.params.categoryId
        };
        this.expandCategory = this.expandCategory.bind(this);
        this.openAddDialog = this.openAddDialog.bind(this);
        this.openEditDialog = this.openEditDialog.bind(this);
        this.putInToCategory = this.putInToCategory.bind(this);
        this.activateCategory = this.activateCategory.bind(this);
        this.removeCategory = this.removeCategory.bind(this);
    }

    expandCategory(e) {
        e.stopPropagation();
        if (this.props.category.get("categories").size > 0) {
            this.setState(
                {
                    isChildrenCollapsed: !this.state.isChildrenCollapsed
                }
            )
        }
    }

    openEditDialog(e) {
        e.stopPropagation();
        this.props.dispatch(setCategoryProcessorAction(null, this.props.category));
    }

    openAddDialog(e) {
        e.stopPropagation();
        this.props.dispatch(setCategoryProcessorAction(this.props.category.get("id"), this.props.categoryBlank));
    }

    putInToCategory(e) {
        e.stopPropagation();
        let {categoryId, todoId} = this.props.params;
        this.dispatch(putTodoInCategoryAction(todoId, categoryId, this.props.category.get("id")));
    }

    activateCategory(e) {
        e.stopPropagation();
        this.props.dispatch(push("category-list/" + this.props.category.get("id")));
    }

    removeCategory(e) {
        e.stopPropagation();
        this.props.dispatch(removeCategoryAction(this.props.category.get("id")))
    }

    componentWillReceiveProps() {
        this.setState({isActivate: this.props.category.get("id") === +this.props.params.categoryId});
    }

    render() {
        let {category, createCategoryArray} = this.props;
        let childrenTree = createCategoryArray(category.get("categories"));
        let isNotChildrenTreeEmpty = childrenTree.some(item => !!item);

        return (
            <span className={"category " + (this.state.isActivate ? 'active' : "")} onClick={this.activateCategory}>
                <Paper className="paper" zDepth={2} children={
                    <div className="main">
                        <div className="title">
                            <div className="expand">
                                {isNotChildrenTreeEmpty ?
                                    <IconButton>
                                        {this.state.isChildrenCollapsed ?
                                            <NavigationChevronRight onClick={this.expandCategory}/> :
                                            <NavigationExpandMore onClick={this.expandCategory}/>}
                                    </IconButton> : ""}
                            </div>
                            {category.get("title")}
                        </div>
                        {!!this.props.categoryData.get("editingTodo") ?
                            <div className="actions">
                                <div className="put-to-this-category">
                                    <IconButton>
                                        <ContentReply onClick={this.putInToCategory}/>
                                    </IconButton>
                                </div>
                            </div> :
                            <div className="actions">
                                <div className="edit">
                                    <IconButton>
                                        <EditorModeEdit onClick={this.openEditDialog}/>
                                    </IconButton>
                                </div>
                                <div className="remove">
                                    <IconButton>
                                        <ActionDeleteForever onClick={this.removeCategory}/>
                                    </IconButton>
                                </div>
                                <div className="add">
                                    <IconButton>
                                        <ContentAddBox onClick={this.openAddDialog}/>
                                    </IconButton>
                                </div>
                            </div>
                        }
                    </div>
                }/>
                <div
                    className={(category.get("categories") ? 'children ' : '') + (this.state.isChildrenCollapsed ? 'collapsed' : '')}>
                    {childrenTree}
                </div>
            </span>
        )
    }
}

