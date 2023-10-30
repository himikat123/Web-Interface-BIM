import React from "react";
import { iMenuUserItem } from "../../interfaces";

export default (props: iMenuUserItem) => {
    return (
        <a href={props.link} 
          className={"block px-4 py-2 text-sm text-gray-700" + (props.current == props.link ? " bg-gray-100" : "")} 
          role="menuitem" 
          tabIndex={-1} 
          id={"user-menu-item-" + props.num}
        >
            {props.title}
        </a>
    )
}