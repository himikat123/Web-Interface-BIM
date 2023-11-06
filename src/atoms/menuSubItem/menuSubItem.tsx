import React from "react";
import { iMenuUserItem } from "../../interfaces";

export default (props: iMenuUserItem) => {
    return (
        <a href={props.link} 
          className={"block px-4 py-2 text-sm " + (props.current == props.link ? "bg-menu_dark dark:bg-menu_light text-text_dark dark:text-text_light" : "text-text_light dark:text-text_dark")} 
          role="menuitem" 
          tabIndex={-1} 
          id={"user-menu-item-" + props.num}
        >
            {props.title}
        </a>
    )
}