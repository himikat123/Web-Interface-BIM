import React from "react";
import { iMenuUserItem } from "../interfaces";
import { Link } from "react-router-dom";

const MenuSubItem = (props: iMenuUserItem) => {
    return (
        <Link to={props.link} 
          className={"block px-4 py-2 text-sm " + (props.current === props.link ? "bg-menu_active_light dark:bg-menu_active_dark text-text_dark" : "text-text_light dark:text-text_dark")} 
          role="menuitem" 
          tabIndex={-1} 
          id={"user-menu-item-" + props.num}
        >
            {props.title}
        </Link>
    )
}

export default MenuSubItem;