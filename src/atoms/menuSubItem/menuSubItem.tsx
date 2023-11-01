import React from "react";
import { iMenuUserItem } from "../../interfaces";

export default (props: iMenuUserItem) => {
    return (
        <a href={props.link} 
          className={"block px-4 py-2 text-sm " + (props.current == props.link ? "bg-gray-700 dark:bg-gray-300 text-white dark:text-black" : "text-black dark:text-white")} 
          role="menuitem" 
          tabIndex={-1} 
          id={"user-menu-item-" + props.num}
        >
            {props.title}
        </a>
    )
}