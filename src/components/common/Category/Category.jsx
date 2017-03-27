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
    }

    expandCategory() {
        debugger;
        this.setState({isChildrenCollapsed: !this.state.isChildrenCollapsed})
    }

    render() {
        let {data, editEvent, removeEvent, newEvent, createCategoryTree} = this.props;
        let childrenTree = createCategoryTree(data.children, editEvent, removeEvent, newEvent, createCategoryTree);
        return (
            <div className="category">
                <Paper className="paper" zDepth={2} children={
                    <div className="main">
                        <div className="title">
                            <div className="expand">
                                <IconButton>
                                    <NavigationChevronRight onClick={this.expandCategory}/>
                                    {/*<NavigationExpandMore />*/}
                                </IconButton>
                            </div>
                            {data.title}
                        </div>
                        <div className="actions">
                            <div className="edit">
                                <IconButton>
                                    <EditorModeEdit onClick={editEvent}/>
                                </IconButton>
                            </div>
                            <div className="remove">
                                <IconButton>
                                    <ActionDeleteForever onClick={removeEvent}/>
                                </IconButton>
                            </div>
                            <div className="add">
                                <IconButton>
                                    <ContentAddBox onClick={newEvent}/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                }/>
                <div className={"children " + (this.state.isChildrenCollapsed ? 'collapsed' : '')}>
                    {childrenTree}
                </div>
            </div>
        )
    }
}