import * as React from "react";
import {IconButton} from "material-ui";
import {EditorModeEdit, ActionDeleteForever, ContentAddBox, NavigationExpandMore, NavigationChevronRight} from "material-ui/svg-icons/index";

import "./Category.scss"

export class Category extends React.Component {

    constructor(){
        super();
        this.expandCategory.bind(this);
    }

    expandCategory(){
        console.log("The category is expanded");
    }

    render() {
        let {title, editEvent, removeEvent, newEvent} = this.props;
        return (
            <div className="category">
                <div className="title">
                    <div className="expand">
                        <IconButton>
                            <NavigationChevronRight onClick={this.expandCategory}/>
                            {/*<NavigationExpandMore />*/}
                        </IconButton>
                    </div>
                    {title}
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
        )
    }
}