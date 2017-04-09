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
import {hashHistory, Link} from 'react-router';

import "./Category.scss"
import {AddInputStringDialog} from "../AddInputStringDialog/AddInputStringDialog";

export class Category extends React.Component {

    constructor() {
        super();
        this.state = {
            isChildrenCollapsed: true,
            addEditDialog: false,
            editEntity: null,
            isActivate: false,
        };
        this.expandCategory = this.expandCategory.bind(this);
        this.openAddDialog = this.openAddDialog.bind(this);
        this.openEditDialog = this.openEditDialog.bind(this);
        this.putInToCategory = this.putInToCategory.bind(this);
        this.activateCategory = this.activateCategory.bind(this);
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

    openEditDialog(e) {
        this.setState({
            addEditDialog: !this.state.addEditDialog,
            editEntity: this.state.editEntity ? null : this.props.categoryData
        })
    }

    openAddDialog(e) {
        this.setState({
            addEditDialog: !this.state.addEditDialog,
            editEntity: null
        })
    }

    putInToCategory(e) {
        e.stopPropagation();
        let {serviceActions, categoryData} = this.props;
        let {categoryId, todoId} = this.props.params;
        serviceActions.changeCategory(todoId, categoryId, categoryData.id);
    }

    activateCategory(e){
        e.stopPropagation();
        this.setState({isActivate: true});
        let location = this.props.location;
        location.pathname = "category-list/" + this.props.categoryData.id;
        this.props.router.push(location)
    }

    componentWillMount(){
        this.setState({isActivate: this.props.categoryData.id == this.props.params.categoryId});
    }

    componentWillReceiveProps(){
        this.setState({isActivate: this.props.categoryData.id == this.props.params.categoryId});
    }

    render() {
        let {serviceActions, categoryData, parentId} = this.props;

        let childrenTree = serviceActions.createCategoryTree(serviceActions, categoryData.categories, categoryData.id);
        let toggleEvents = {
            openEditDialog: this.openEditDialog,
            openAddDialog: this.openAddDialog,
        };

        let isNotChildrenTreeEmpty = childrenTree.some((item) => {
            return !!item;
        });

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
                            {categoryData.title}
                        </div>
                        {this.props.params.todoId ?
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
                                        <ActionDeleteForever onClick={(e) => {
                                            serviceActions.removeCategory(parentId, categoryData.id, e)
                                        }}/>
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
                    className={(categoryData.categories ? 'children ' : '') + (this.state.isChildrenCollapsed ? 'collapsed' : '')}>
                    {childrenTree}
                </div>
                <AddInputStringDialog
                    editEntity={this.state.editEntity}
                    parentId={categoryData.id}
                    isOpened={this.state.addEditDialog}
                    toggleEvents={toggleEvents}
                    addEvent={serviceActions.addCategoryTitle}
                    editEvent={serviceActions.editCategory}
                />
            </span>
        )
    }
}